
<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\ServiceController;

use App\Models\Room;
use App\Models\Service;
use App\Models\Order;
use App\Models\ContactMessage;
use App\Models\User;

use App\Notifications\NewOrderNotification;


// ======================================
// تسجيل الدخول
// ======================================

Route::post('/login', [AuthController::class, 'login']);


// ======================================
// الخدمات المتاحة للزوار
// ======================================

Route::get('/services', [ServiceController::class, 'guestIndex']);

// Public guest lookup: a room number is the QR identifier, and only that
// room's orders are ever returned. No guest authentication or room listing.
Route::get('/guest/rooms/{room_number}', function (string $room_number) {
    $room = Room::where('room_number', $room_number)->firstOrFail();
    return response()->json(['id' => $room->id, 'room_number' => $room->room_number]);
});

Route::get('/guest/orders', function (Request $request) {
    $data = $request->validate(['room' => 'required|string|max:30']);
    $room = Room::where('room_number', $data['room'])->firstOrFail();
    return Order::where('room_id', $room->id)->with('room', 'items')->latest()->get();
});


// ======================================
// استقبال طلب جديد
// ======================================

Route::post('/orders', function (Request $request) {

    $data = $request->validate([
        'room_id' => 'required_without:room_number|exists:rooms,id',
        'room_number' => 'required_without:room_id|string|max:30|exists:rooms,room_number',
        'order_type' => 'required|in:خدمات الغرف,المغسلة,الكافيه',
        'notes' => 'nullable|string',
        'items' => 'required|array|min:1',
        'items.*.service_id' => 'required|exists:services,id',
        'items.*.quantity' => 'required|integer|min:1',
    ]);

    return DB::transaction(function () use ($data) {

        $room = isset($data['room_id']) ? Room::findOrFail($data['room_id']) : Room::where('room_number', $data['room_number'])->firstOrFail();
        $order = Order::create([
            'room_id' => $room->id,
            'order_number' => 'JH-' . now()->format('YmdHis') . random_int(10, 99),
            'order_type' => $data['order_type'],
            'notes' => $data['notes'] ?? null,
            'status' => 'جديد',
        ]);

        foreach ($data['items'] as $item) {

            $service = Service::findOrFail($item['service_id']);

            abort_unless(
                $service->is_available,
                422,
                'الخدمة غير متاحة'
            );

            $order->items()->create([
                'service_id' => $service->id,
                'service_name' => $service->name,
                'quantity' => $item['quantity'],
                'unit_price' => $service->price,
            ]);
        }

        // إرسال تنبيه للمدير والموظفين
        Notification::send(
            User::whereIn('role', ['admin', 'employee'])->get(),
            new NewOrderNotification($order)
        );

        return response()->json(
            $order->load('items'),
            201
        );
    });
});


// ======================================
// استقبال رسائل التواصل
// ======================================

Route::post('/contact', function (Request $request) {

    $data = $request->validate([
        'name' => 'required|string|max:150',
        'phone' => 'required|string|max:30',
        'email' => 'nullable|email',
        'subject' => 'required|string|max:200',
        'message' => 'required|string',
        'room_id' => 'nullable|exists:rooms,id',
    ]);

    return response()->json(
        ContactMessage::create($data),
        201
    );
});


// ======================================
// المسارات التي تتطلب تسجيل الدخول
// ======================================

Route::middleware('auth:sanctum')->group(function () {

    // بيانات المستخدم
    Route::get('/me', [AuthController::class, 'me']);

    // تسجيل الخروج
    Route::post('/logout', [AuthController::class, 'logout']);


    // ======================================
    // التنبيهات
    // ======================================

    // عرض جميع التنبيهات
    Route::get('/notifications', function (Request $request) {
        return $request->user()->notifications()->latest()->get();
    });

    // قراءة تنبيه محدد
    Route::patch('/notifications/{id}/read', function (Request $request, $id) {

        $notification = $request->user()
            ->notifications()
            ->whereKey($id)
            ->firstOrFail();

        $notification->markAsRead();

        return response()->json([
            'success' => true,
            'message' => 'تمت قراءة التنبيه',
        ]);
    });

    // قراءة جميع التنبيهات
    Route::patch('/notifications/read-all', function (Request $request) {

        $request->user()->unreadNotifications()->update([
            'read_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'تمت قراءة جميع التنبيهات',
        ]);
    });


    // ======================================
    // صلاحيات المدير والموظف
    // ======================================

    Route::middleware('role:admin,employee')->group(function () {

        // إدارة الغرف
        Route::apiResource('rooms', RoomController::class);

        // إدارة الخدمات
        // Public GET /services is registered above; protect only mutations and
        // individual service routes for the administration API.
        Route::apiResource('services', ServiceController::class)->except(['index']);


        // عرض جميع الطلبات
        Route::get('/orders', function () {

            return Order::with([
                'room',
                'items.service'
            ])->latest()->get();

        });


        // تحديث حالة الطلب
        Route::patch('/orders/{order}', function (Request $request, Order $order) {

            $data = $request->validate([
                'status' => 'required|in:جديد,قيد المعالجة,مكتمل,ملغي',
            ]);

            $order->update([
                'status' => $data['status'],
                'completed_at' => $data['status'] === 'مكتمل'
                    ? now()
                    : null,
            ]);

            return $order->load('room', 'items.service');
        });


        // رسائل التواصل
        Route::get('/messages', function () {
            return ContactMessage::latest()->get();
        });


        // إحصائيات لوحة التحكم
        Route::get('/stats', function () {

            return [
                'rooms' => Room::count(),

                'available_rooms' => Room::where(
                    'status',
                    'متاحة'
                )->count(),

                'orders' => Order::count(),

                'new_orders' => Order::where(
                    'status',
                    'جديد'
                )->count(),

                'revenue' => DB::table('order_items')
                    ->join('orders', 'orders.id', '=', 'order_items.order_id')
                    ->where('orders.status', 'مكتمل')
                    ->sum(DB::raw('quantity * unit_price')),
            ];
        });

    });


    // ======================================
    // صلاحيات المدير فقط
    // ======================================

    Route::middleware('role:admin')->group(function () {


        // ======================================
        // التقارير والإحصائيات التفصيلية
        // ======================================

        Route::get('/reports', function (Request $request) {

            $filters = $request->validate([
                'from' => 'nullable|date',
                'to' => 'nullable|date|after_or_equal:from',
            ]);

            $orders = Order::query();

            if (!empty($filters['from'])) {
                $orders->whereDate('created_at', '>=', $filters['from']);
            }

            if (!empty($filters['to'])) {
                $orders->whereDate('created_at', '<=', $filters['to']);
            }

            $revenueQuery = DB::table('order_items')
                ->join('orders', 'orders.id', '=', 'order_items.order_id')
                ->where('orders.status', 'مكتمل');

            if (!empty($filters['from'])) {
                $revenueQuery->whereDate('orders.created_at', '>=', $filters['from']);
            }

            if (!empty($filters['to'])) {
                $revenueQuery->whereDate('orders.created_at', '<=', $filters['to']);
            }

            return response()->json([

                'total_orders' => (clone $orders)->count(),

                'new_orders' => (clone $orders)
                    ->where('status', 'جديد')->count(),

                'processing_orders' => (clone $orders)
                    ->where('status', 'قيد المعالجة')->count(),

                'completed_orders' => (clone $orders)
                    ->where('status', 'مكتمل')->count(),

                'cancelled_orders' => (clone $orders)
                    ->where('status', 'ملغي')->count(),

                'revenue' => $revenueQuery->sum(
                    DB::raw('order_items.quantity * order_items.unit_price')
                ),

                'orders' => $orders
                    ->with(['room', 'items'])
                    ->latest()
                    ->get(),

            ]);
        });


        // ======================================
        // تصدير التقارير إلى CSV
        // ======================================

        Route::get('/reports/export', function (Request $request) {

            $filters = $request->validate([
                'from' => 'nullable|date',
                'to' => 'nullable|date|after_or_equal:from',
            ]);

            $query = DB::table('orders')
                ->leftJoin('rooms', 'rooms.id', '=', 'orders.room_id')
                ->leftJoinSub(
                    DB::table('order_items')
                        ->select(
                            'order_id',
                            DB::raw('SUM(quantity * unit_price) as total')
                        )
                        ->groupBy('order_id'),
                    'totals',
                    'totals.order_id',
                    '=',
                    'orders.id'
                )
                ->select(
                    'orders.order_number',
                    'rooms.room_number',
                    'orders.order_type',
                    'orders.status',
                    DB::raw('COALESCE(totals.total, 0) as total'),
                    'orders.created_at',
                    'orders.completed_at'
                );

            if (!empty($filters['from'])) {
                $query->whereDate('orders.created_at', '>=', $filters['from']);
            }

            if (!empty($filters['to'])) {
                $query->whereDate('orders.created_at', '<=', $filters['to']);
            }

            return response()->streamDownload(function () use ($query) {

                $file = fopen('php://output', 'w');

                // دعم اللغة العربية في Excel
                fwrite($file, "\xEF\xBB\xBF");

                fputcsv($file, [
                    'رقم الطلب',
                    'رقم الغرفة',
                    'نوع الطلب',
                    'الحالة',
                    'الإجمالي',
                    'تاريخ الطلب',
                    'تاريخ الاكتمال',
                ]);

                foreach ($query->orderByDesc('orders.created_at')->cursor() as $order) {

                    fputcsv($file, [
                        $order->order_number,
                        $order->room_number,
                        $order->order_type,
                        $order->status,
                        $order->total,
                        $order->created_at,
                        $order->completed_at,
                    ]);
                }

                fclose($file);

            }, 'hotel-reports.csv', [
                'Content-Type' => 'text/csv; charset=UTF-8',
            ]);
        });


        // ======================================
        // إدارة الموظفين
        // ======================================

        Route::apiResource('employees', EmployeeController::class)
            ->only([
                'index',
                'store',
                'update',
                'destroy'
            ]);

    });

});
