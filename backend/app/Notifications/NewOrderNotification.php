<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\Order;

class NewOrderNotification extends Notification
{
    use Queueable;

    public function __construct(public Order $order) {}

    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toArray($notifiable): array
    {
        return [
            'title' => 'طلب جديد',
            'message' => 'وصل طلب جديد رقم ' . $this->order->order_number,
            'order_id' => $this->order->id,
            'order_number' => $this->order->order_number,
            'order_type' => $this->order->order_type,
            'room_id' => $this->order->room_id,
        ];
    }
}
