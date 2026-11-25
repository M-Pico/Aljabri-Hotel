# فندق الجابري (Jabri Hotel)

## 1. مقدمة المشروع

فندق الجابري نظام ويب لإدارة خدمات الفندق وطلبات النزلاء. يتكون من واجهة عامة للنزيل، ولوحة إدارة، وخدمة خلفية توفر واجهات API لإدارة بيانات الفندق والطلبات.

### التقنيات الفعلية

- **الواجهة الأمامية:** Next.js `16.4.3`، React وReact DOM `19.3.0`، وTypeScript `5.9.3` (الإصدار المقفل في `Frontend/package-lock.json`؛ والقيد المعلن هو `^5`). تستخدم الواجهة Next.js App Router.
- **الخلفية:** Laravel `12.73.0` وLaravel Sanctum `4.5.0` (وفق `backend/composer.lock`؛ القيود المعلنة `^12.0` و`^4.0`) وPHP `^8.2`.
- **قاعدة البيانات:** إعداد `backend/.env` الفعلي يحدد `DB_CONNECTION=mysql`. ملف `backend/.env.example` مضبوط على SQLite كنموذج إعداد، وتهيئة Laravel تتضمن أيضًا موصل MySQL. لم تُدرج بيانات الاتصال أو أي أسرار في هذا الملف.

### مكونات النظام

- الموقع العام وصفحات خدمات النزيل والاتصال و«طلباتي» ضمن `Frontend/app`.
- صفحات لوحة الإدارة، ومكوناتها ومساعد المصادقة ضمن `Frontend/app/admin`.
- واجهة Laravel API ومساراتها ضمن `backend/routes/api.php`، مع وحدات التحكم والنماذج في `backend/app`.
- مخطط قاعدة البيانات وتعريفاته في ترحيلات Laravel ضمن `backend/database/migrations`.

## 2. بنية المشروع

```text
Jabri-Hotel/
├── .gitignore
├── README.md                         # هذا الملف
├── PROJECT_STATUS.md
├── Frontend/
│   ├── app/
│   │   ├── admin/                    # لوحة الإدارة وصفحاتها ومكوناتها
│   │   │   ├── components/           # مكونات الإدارة المشتركة
│   │   │   ├── dashboard/            # تخطيط وصفحات الإدارة ضمن مجموعة dashboard
│   │   │   ├── login/                # تسجيل دخول الإدارة
│   │   │   ├── rooms/ services/ orders/ messages/ reports/ staff/ settings/
│   │   ├── components/               # مكونات الموقع العام والطلبات
│   │   ├── services/                 # خدمات النزيل وصفحاتها وعميل API
│   │   ├── contact/                  # صفحة التواصل
│   │   ├── my-orders/                # صفحة طلبات النزيل
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                  # الصفحة الرئيسية العامة
│   ├── public/                       # الصور والأيقونات والملفات الثابتة
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
└── backend/
    ├── app/
    │   ├── Http/Controllers/Api/     # متحكمات API
    │   ├── Http/Middleware/          # وسيط الصلاحيات
    │   ├── Models/                   # نماذج Eloquent
    │   └── Notifications/            # إشعارات التطبيق
    ├── bootstrap/                    # تهيئة Laravel
    ├── config/                       # إعدادات Laravel، ومنها قاعدة البيانات وSanctum
    ├── database/
    │   ├── factories/                # مصانع بيانات الاختبار
    │   ├── migrations/               # تعريف مخطط قاعدة البيانات
    │   └── seeders/                  # Seeders
    ├── public/                       # نقطة دخول Laravel
    ├── resources/                    # موارد CSS وJavaScript وواجهات Blade
    ├── routes/                       # مسارات API والويب وArtisan
    ├── tests/                        # اختبارات Laravel
    ├── artisan
    ├── composer.json
    └── phpunit.xml
```

**فصل المكونات:** تطبيق Next.js مستقل داخل `Frontend` ويضم الموقع العام ولوحة الإدارة. تطبيق Laravel مستقل داخل `backend` ويقدم API ويحتوي على نماذج البيانات وترحيلاتها. مجلد `Frontend/public` مخصص للأصول الثابتة؛ أما `backend/public` فهو نقطة الدخول العامة لتطبيق Laravel. لا تتضمن الشجرة مجلدات الاعتماديات أو نواتج البناء (`node_modules` أو `vendor` أو `.next`).

## 3. هيكل قاعدة البيانات

المعلومات أدناه مستخرجة من ملفات `backend/database/migrations`. أنواع مثل `id()` و`foreignId()` و`timestamps()` و`morphs()` هي اختصارات Laravel Blueprint؛ يوضح الجدول نوعها المعتاد في قواعد SQL. أعمدة `created_at` و`updated_at` التي تنشئها `timestamps()` قابلة لـ `NULL`. لم تُستنتج قيود أو علاقات غير معرفة في الترحيلات.

### جداول الفندق

#### `rooms` — الغرف

| العمود | النوع | NULL / القيمة الافتراضية | المفتاح أو الفهرس |
|---|---|---|---|
| `id` | BIGINT UNSIGNED، زيادة تلقائية | لا | PK |
| `room_number` | VARCHAR(255) | لا | UNIQUE |
| `room_type` | ENUM(`مفردة`, `مزدوجة`, `جناح`) | لا | — |
| `status` | VARCHAR(255) | لا؛ `متاحة` | — |
| `qr_code` | VARCHAR(255) | نعم | — |
| `created_at`, `updated_at` | TIMESTAMP | نعم | — |

#### `services` — الخدمات

| العمود | النوع | NULL / القيمة الافتراضية | المفتاح أو الفهرس |
|---|---|---|---|
| `id` | BIGINT UNSIGNED، زيادة تلقائية | لا | PK |
| `name` | VARCHAR(255) | لا | — |
| `category` | ENUM(`خدمات الغرف`, `المغسلة`, `الكافيه`) | لا | — |
| `description` | TEXT | نعم | — |
| `price` | DECIMAL(10,2) | لا؛ `0` | — |
| `image` | VARCHAR(255) | نعم | — |
| `is_available` | BOOLEAN | لا؛ `true` | — |
| `created_at`, `updated_at` | TIMESTAMP | نعم | — |

#### `orders` — الطلبات

| العمود | النوع | NULL / القيمة الافتراضية | المفتاح أو الفهرس |
|---|---|---|---|
| `id` | BIGINT UNSIGNED، زيادة تلقائية | لا | PK |
| `room_id` | BIGINT UNSIGNED | لا | FK → `rooms.id`؛ حذف الغرفة يحذف الطلبات التابعة (`CASCADE`) |
| `order_number` | VARCHAR(255) | لا | UNIQUE |
| `order_type` | ENUM(`خدمات الغرف`, `المغسلة`, `الكافيه`) | لا | — |
| `status` | ENUM(`جديد`, `قيد المعالجة`, `مكتمل`, `ملغي`) | لا؛ `جديد` | — |
| `notes` | TEXT | نعم | — |
| `completed_at` | TIMESTAMP | نعم | — |
| `created_at`, `updated_at` | TIMESTAMP | نعم | — |

#### `order_items` — تفاصيل الطلب

| العمود | النوع | NULL / القيمة الافتراضية | المفتاح أو الفهرس |
|---|---|---|---|
| `id` | BIGINT UNSIGNED، زيادة تلقائية | لا | PK |
| `order_id` | BIGINT UNSIGNED | لا | FK → `orders.id`؛ حذف الطلب يحذف تفاصيله (`CASCADE`) |
| `service_id` | BIGINT UNSIGNED | نعم | FK → `services.id`؛ حذف الخدمة يجعل القيمة `NULL` (`SET NULL`) |
| `service_name` | VARCHAR(255) | لا | — |
| `quantity` | INT | لا؛ `1` | — |
| `unit_price` | DECIMAL(10,2) | لا | — |
| `notes` | TEXT | نعم | — |
| `created_at`, `updated_at` | TIMESTAMP | نعم | — |

#### `contact_messages` — رسائل التواصل

| العمود | النوع | NULL / القيمة الافتراضية | المفتاح أو الفهرس |
|---|---|---|---|
| `id` | BIGINT UNSIGNED، زيادة تلقائية | لا | PK |
| `name` | VARCHAR(255) | لا | — |
| `phone` | VARCHAR(255) | لا | — |
| `email` | VARCHAR(255) | نعم | — |
| `subject` | VARCHAR(255) | لا | — |
| `message` | TEXT | لا | — |
| `room_id` | BIGINT UNSIGNED | نعم | FK → `rooms.id`؛ حذف الغرفة يضبط القيمة إلى `NULL` (`SET NULL`) |
| `status` | ENUM(`جديد`, `قيد المراجعة`, `تم الرد`) | لا؛ `جديد` | — |
| `created_at`, `updated_at` | TIMESTAMP | نعم | — |

#### `notifications` — الإشعارات

| العمود | النوع | NULL / القيمة الافتراضية | المفتاح أو الفهرس |
|---|---|---|---|
| `id` | UUID | لا | PK |
| `type` | VARCHAR(255) | لا | — |
| `notifiable_type` | VARCHAR(255) | لا | جزء من فهرس polymorphic مركب مع `notifiable_id` |
| `notifiable_id` | BIGINT UNSIGNED | لا | جزء من الفهرس polymorphic المركب |
| `data` | TEXT | لا | — |
| `read_at` | TIMESTAMP | نعم | — |
| `created_at`, `updated_at` | TIMESTAMP | نعم | — |

ينشئ `morphs('notifiable')` فهرسًا مركبًا على `notifiable_type` و`notifiable_id`. الترحيل لا يعرّف مفتاحًا أجنبيًا لهذين العمودين.

### جداول Laravel المساندة والمصادقة

#### `users` — المستخدمون

| العمود | النوع | NULL / القيمة الافتراضية | المفتاح أو الفهرس |
|---|---|---|---|
| `id` | BIGINT UNSIGNED، زيادة تلقائية | لا | PK |
| `name` | VARCHAR(255) | لا | — |
| `email` | VARCHAR(255) | لا | UNIQUE |
| `email_verified_at` | TIMESTAMP | نعم | — |
| `password` | VARCHAR(255) | لا | — |
| `remember_token` | VARCHAR(100) | نعم | — |
| `created_at`, `updated_at` | TIMESTAMP | نعم | — |
| `role` | ENUM(`admin`, `employee`) | لا؛ `employee` | أضيف بترحيل مستقل |

#### `personal_access_tokens` — رموز Sanctum

| العمود | النوع | NULL / القيمة الافتراضية | المفتاح أو الفهرس |
|---|---|---|---|
| `id` | BIGINT UNSIGNED، زيادة تلقائية | لا | PK |
| `tokenable_type` | VARCHAR(255) | لا | جزء من فهرس polymorphic مركب مع `tokenable_id` |
| `tokenable_id` | BIGINT UNSIGNED | لا | جزء من الفهرس polymorphic المركب |
| `name` | TEXT | لا | — |
| `token` | VARCHAR(64) | لا | UNIQUE |
| `abilities` | TEXT | نعم | — |
| `last_used_at` | TIMESTAMP | نعم | — |
| `expires_at` | TIMESTAMP | نعم | INDEX |
| `created_at`, `updated_at` | TIMESTAMP | نعم | — |

ينشئ `morphs('tokenable')` فهرسًا مركبًا على `tokenable_type` و`tokenable_id`، دون مفتاح أجنبي في الترحيل.

#### `password_reset_tokens` — رموز إعادة تعيين كلمة المرور

| العمود | النوع | NULL / القيمة الافتراضية | المفتاح أو الفهرس |
|---|---|---|---|
| `email` | VARCHAR(255) | لا | PK |
| `token` | VARCHAR(255) | لا | — |
| `created_at` | TIMESTAMP | نعم | — |

#### `sessions` — الجلسات

| العمود | النوع | NULL / القيمة الافتراضية | المفتاح أو الفهرس |
|---|---|---|---|
| `id` | VARCHAR(255) | لا | PK |
| `user_id` | BIGINT UNSIGNED | نعم | INDEX؛ لا يعرّف الترحيل FK |
| `ip_address` | VARCHAR(45) | نعم | — |
| `user_agent` | TEXT | نعم | — |
| `payload` | LONGTEXT | لا | — |
| `last_activity` | INT | لا | INDEX |

### جداول التخزين المؤقت والمهام

#### `cache` و`cache_locks`

| الجدول | العمود | النوع | NULL / القيمة الافتراضية | المفتاح أو الفهرس |
|---|---|---|---|---|
| `cache` | `key` | VARCHAR(255) | لا | PK |
| `cache` | `value` | MEDIUMTEXT | لا | — |
| `cache` | `expiration` | INT | لا | INDEX |
| `cache_locks` | `key` | VARCHAR(255) | لا | PK |
| `cache_locks` | `owner` | VARCHAR(255) | لا | — |
| `cache_locks` | `expiration` | INT | لا | INDEX |

#### `jobs`

| العمود | النوع | NULL / القيمة الافتراضية | المفتاح أو الفهرس |
|---|---|---|---|
| `id` | BIGINT UNSIGNED، زيادة تلقائية | لا | PK |
| `queue` | VARCHAR(255) | لا | INDEX |
| `payload` | LONGTEXT | لا | — |
| `attempts` | TINYINT UNSIGNED | لا | — |
| `reserved_at` | INT UNSIGNED | نعم | — |
| `available_at` | INT UNSIGNED | لا | — |
| `created_at` | INT UNSIGNED | لا | — |

#### `job_batches`

| العمود | النوع | NULL / القيمة الافتراضية | المفتاح أو الفهرس |
|---|---|---|---|
| `id` | VARCHAR(255) | لا | PK |
| `name` | VARCHAR(255) | لا | — |
| `total_jobs` | INT | لا | — |
| `pending_jobs` | INT | لا | — |
| `failed_jobs` | INT | لا | — |
| `failed_job_ids` | LONGTEXT | لا | — |
| `options` | MEDIUMTEXT | نعم | — |
| `cancelled_at` | INT | نعم | — |
| `created_at` | INT | لا | — |
| `finished_at` | INT | نعم | — |

#### `failed_jobs`

| العمود | النوع | NULL / القيمة الافتراضية | المفتاح أو الفهرس |
|---|---|---|---|
| `id` | BIGINT UNSIGNED، زيادة تلقائية | لا | PK |
| `uuid` | VARCHAR(255) | لا | UNIQUE |
| `connection` | TEXT | لا | — |
| `queue` | TEXT | لا | — |
| `payload` | LONGTEXT | لا | — |
| `exception` | LONGTEXT | لا | — |
| `failed_at` | TIMESTAMP | لا؛ `CURRENT_TIMESTAMP` | — |

### العلاقات المعرفة في الترحيلات

- الغرفة الواحدة (`rooms`) يمكن أن ترتبط بعدة طلبات (`orders`)؛ حذف الغرفة يحذف طلباتها.
- الطلب الواحد (`orders`) يمكن أن يحتوي على عدة تفاصيل (`order_items`)؛ حذف الطلب يحذف تفاصيله.
- تفصيل الطلب يرتبط اختياريًا بخدمة (`services`)، وعند حذف الخدمة يبقى التفصيل مع `service_id = NULL`.
- رسالة التواصل ترتبط اختياريًا بغرفة؛ حذف الغرفة يترك الرسالة ويجعل `room_id = NULL`.
- الإشعارات ورموز Sanctum تستخدمان ارتباطًا polymorphic مفهرسًا دون FK صريح في الترحيلات.
- لا ينشئ ترحيل `sessions` مفتاحًا أجنبيًا من `user_id` إلى `users.id`.

## 4. واجهات API (API Endpoints)

جميع المسارات التالية معرفة في `backend/routes/api.php`، ويضيف Laravel بادئة `/api` تلقائيًا. الجسم المرسل للمسارات التي تستقبل JSON يكون بصيغة JSON. المسارات الموسومة **عامة** لا تتطلب مصادقة؛ والمسارات المحمية تتطلب `Authorization: Bearer <token>` صادرًا من تسجيل الدخول.

### المصادقة وخدمات النزيل العامة

| الطريقة والمسار | الوظيفة والمدخلات | الاستجابة المعرفة في الكود | الوصول |
|---|---|---|---|
| `POST /api/login` | تسجيل الدخول؛ JSON: `email` (بريد صالح، مطلوب)، `password` (نص، مطلوب). | نجاح: كائن يحوي `success`, `message`, `token`, `user`. فشل بيانات الدخول: `401` مع `success` و`message`؛ المستخدم غير المسموح بدوره: `403` معهما. | عام؛ يقبل الكود الدورين `admin` و`employee`. |
| `GET /api/services` | قائمة الخدمات المتاحة. | مصفوفة خدمات مرتبة حسب `category` ثم `name`، ومفلترة إلى `is_available = true`. | عام. |
| `GET /api/guest/rooms/{room_number}` | التحقق من رقم غرفة QR. | JSON يحوي `id` و`room_number` للغرفة المطابقة؛ الغرفة غير الموجودة تفشل عبر `firstOrFail`. | عام. |
| `GET /api/guest/orders?room={room_number}` | طلبات الغرفة؛ `room` مطلوب كنص لا يتجاوز 30 حرفًا. | مجموعة طلبات الغرفة فقط، مع `room` و`items`، مرتبة من الأحدث. | عام. |
| `POST /api/orders` | إنشاء طلب نزيل. JSON: أحد `room_id` أو `room_number` مطلوب؛ `order_type` مطلوب ومن `خدمات الغرف` أو `المغسلة` أو `الكافيه`؛ `notes` اختياري؛ `items` مصفوفة مطلوبة بعنصر واحد على الأقل، وكل عنصر يحوي `service_id` موجودًا و`quantity` صحيحًا لا يقل عن 1. | الطلب المنشأ مع `items` برمز `201`. ينشأ بحالة `جديد`، وتؤخذ أسماء الخدمات وأسعارها من قاعدة البيانات. الخدمة غير المتاحة تؤدي إلى `422`. يرسل الكود إشعار طلب جديد للمستخدمين بدوري `admin` و`employee`. | عام. |
| `POST /api/contact` | إرسال رسالة تواصل. JSON: `name` مطلوب بحد 150 حرفًا، `phone` مطلوب بحد 30، `email` اختياري وبريد صالح، `subject` مطلوب بحد 200، `message` مطلوب، و`room_id` اختياري ويجب أن يطابق غرفة. | سجل الرسالة المنشأ بصيغة JSON برمز `201`. | عام. |

### جلسة المستخدم والإشعارات

| الطريقة والمسار | الوظيفة والمدخلات | الاستجابة المعرفة في الكود | الوصول |
|---|---|---|---|
| `GET /api/me` | المستخدم الحالي؛ دون جسم. | `{ "success": true, "user": ... }`، وحقول كلمة المرور و`remember_token` مخفية بواسطة نموذج المستخدم. | Sanctum. |
| `POST /api/logout` | إبطال التوكن الحالي؛ دون جسم. | `{ "success": true, "message": "تم تسجيل الخروج بنجاح" }`. | Sanctum. |
| `GET /api/notifications` | إشعارات المستخدم الحالي. | مجموعة إشعاراته مرتبة من الأحدث. | Sanctum. |
| `PATCH /api/notifications/{id}/read` | وضع الإشعار المحدد كمقروء؛ `id` في المسار. | `{ "success": true, "message": "تمت قراءة التنبيه" }`. | Sanctum؛ الإشعار مطلوب أن يكون تابعًا للمستخدم الحالي. |
| `PATCH /api/notifications/read-all` | وضع إشعارات المستخدم غير المقروءة كمقروءة؛ دون جسم. | `{ "success": true, "message": "تمت قراءة جميع التنبيهات" }`. | Sanctum. |

### إدارة الغرف والخدمات والطلبات والرسائل

كل المسارات في هذا الجدول محمية بـSanctum وبوسيط `role:admin,employee`.

| الطريقة والمسار | الوظيفة والمدخلات | الاستجابة المعرفة في الكود |
|---|---|---|
| `GET /api/rooms` | قائمة الغرف. | مصفوفة نماذج `Room` مرتبة من الأحدث. |
| `POST /api/rooms` | إضافة غرفة: `room_number` و`room_type` مطلوبان؛ النوع أحد `مفردة`، `مزدوجة`، `جناح`؛ `status` اختياري نص؛ `qr_code` اختياري نص أو `null`. | نموذج الغرفة المنشأ. |
| `GET /api/rooms/{room}` | عرض غرفة واحدة. | نموذج الغرفة. |
| `PUT/PATCH /api/rooms/{room}` | تحديث جزئي: `room_number`, `room_type`, `status`, `qr_code` وفق قواعد الإضافة، وكلها اختيارية في التحديث. | نموذج الغرفة بعد التحديث. |
| `DELETE /api/rooms/{room}` | حذف غرفة. | استجابة بلا محتوى (`204`). وفق FK في الترحيل، حذف الغرفة يحذف طلباتها التابعة. |
| `POST /api/services` | إضافة خدمة: `name` و`category` و`price` مطلوبة؛ الاسم حتى 150 حرفًا؛ التصنيف أحد التصنيفات الثلاثة أعلاه؛ `price` رقم غير سالب؛ `description` و`image` اختياريان؛ `is_available` اختياري منطقي. | نموذج الخدمة المنشأ. |
| `GET /api/services/{service}` | عرض خدمة واحدة. | نموذج الخدمة. |
| `PUT/PATCH /api/services/{service}` | تحديث الخدمة؛ الحقول `name`, `category`, `description`, `price`, `image`, `is_available` وفق قواعد المتحكم: `name`, `category`, `description`, `price`, و`image` تستخدم `sometimes`؛ و`is_available` يخضع لقاعدة `boolean` إذا أُرسل. | نموذج الخدمة بعد التحديث. |
| `DELETE /api/services/{service}` | حذف خدمة. | استجابة بلا محتوى (`204`). تفاصيل الطلب تحتفظ بالخدمة المحذوفة كمرجع نصي، ويصبح `service_id` فارغًا وفق FK. |
| `GET /api/orders` | عرض الطلبات الإدارية. | مصفوفة طلبات مع علاقات `room` و`items.service`، مرتبة من الأحدث. |
| `PATCH /api/orders/{order}` | تحديث الحالة؛ JSON يحوي `status` مطلوبًا من `جديد`, `قيد المعالجة`, `مكتمل`, `ملغي`. | الطلب مع `room` و`items.service`. عند `مكتمل` يضبط `completed_at` للوقت الحالي، وفي غير ذلك يصبح `null`. |
| `GET /api/messages` | قائمة رسائل التواصل. | مصفوفة الرسائل مرتبة من الأحدث. لا يوجد في ملف المسارات الحالي API لتعديل الرسالة أو حذفها. |
| `GET /api/stats` | إحصاءات لوحة الإدارة. | كائن يحوي `rooms`, `available_rooms`, `orders`, `new_orders`, `revenue`؛ الإيراد مجموع `quantity * unit_price` للطلبات المكتملة. |

### التقارير والموظفون — المدير فقط

تتطلب جميع المسارات في هذا الجدول Sanctum ودور `admin` حصريًا (`role:admin`).

| الطريقة والمسار | الوظيفة والمدخلات | الاستجابة المعرفة في الكود |
|---|---|---|
| `GET /api/reports?from=YYYY-MM-DD&to=YYYY-MM-DD` | تقرير اختياري بالتاريخ؛ `from` و`to` تاريخان صالحان و`to` لا يسبق `from`. | JSON: `total_orders`, `new_orders`, `processing_orders`, `completed_orders`, `cancelled_orders`, `revenue`, و`orders` مع `room` و`items`. الإيراد محسوب للطلبات المكتملة ضمن الفترة. |
| `GET /api/reports/export?from=YYYY-MM-DD&to=YYYY-MM-DD` | تصدير اختياري للفترة، وبقواعد التاريخ نفسها. | تنزيل CSV باسم `hotel-reports.csv`، بترميز UTF-8 مع BOM، وأعمدة رقم الطلب، رقم الغرفة، النوع، الحالة، الإجمالي، تاريخ الطلب، وتاريخ الاكتمال. |
| `GET /api/employees` | قائمة حسابات الموظفين. | مصفوفة بعناصر مختارة الحقول `id`, `name`, `email`, `created_at`. |
| `POST /api/employees` | إنشاء موظف؛ JSON: `name` مطلوب، `email` مطلوب وفريد، `password` مطلوب بطول 8 أحرف على الأقل. | `201`: `{ success, message, employee }`، وبيانات الموظف المعروضة `id`, `name`, `email`, `role`. كلمة المرور لا تُعاد. |
| `PUT/PATCH /api/employees/{employee}` | تحديث الموظف؛ `name` و`email` و`password` اختيارية، وإذا أرسلت فتخضع لقواعد الإنشاء؛ البريد يستثني الموظف الحالي من شرط التفرد. | `{ success, message, employee }` بالحقول الظاهرة نفسها. يرفض المتحكم مستخدمًا ليس بدور employee برمز `404`. |
| `DELETE /api/employees/{employee}` | حذف موظف؛ يحذف المتحكم توكناته أولًا. | `{ success, message }`. يرفض المتحكم مستخدمًا ليس بدور employee برمز `404`. |

تعيد Laravel أخطاء التحقق وفق سلوكها القياسي عند فشل قواعد الإدخال، كما أن وسيط الدور يعيد `403` مع `success: false` و`message` عند غياب الدور المسموح. لم يُضف هذا التوثيق مسارات غير الموجودة في `routes/api.php`.

## 5. متطلبات التشغيل

- **PHP:** إصدار يحقق القيد `^8.2` في `backend/composer.json`.
- **Node.js:** `>=20.9.0`، وفق حقل `engines` لحزمة Next.js المقفلة في `Frontend/package-lock.json`.
- **Composer:** مطلوب لتثبيت اعتماديات Laravel. ملفات المشروع لا تحدد رقم إصدار Composer أدنى؛ استخدم إصدارًا متوافقًا مع `composer.lock`.
- **قاعدة البيانات:** إعداد التطبيق الفعلي يختار MySQL (`DB_CONNECTION=mysql`). لا يثبت المشروع حدًا أدنى لنسخة MySQL؛ لذلك يجب اعتماد نسخة متوافقة مع Laravel 12 وموصل MySQL المستخدم في بيئة النشر. ملف `.env.example` يختار SQLite افتراضيًا، لا MySQL.
- **اعتماديات الواجهة:** تثبت عبر npm من `Frontend/package-lock.json`. إعداد API للواجهة يقرأ `NEXT_PUBLIC_API_URL`، والافتراضي في الكود `http://127.0.0.1:8000/api`.

## 6. التثبيت والتشغيل المحلي

### أولًا: Backend (Laravel)

1. ثبّت PHP بالإصدار المطلوب وComposer، وجهّز MySQL وأنشئ قاعدة بيانات فارغة مخصصة للتطبيق. لا تستخدم قاعدة بيانات إنتاج أثناء الإعداد المحلي.
2. من مجلد `backend` ثبّت الحزم:

   ```powershell
   cd backend
   composer install
   ```

3. أنشئ ملف بيئة محليًا من النموذج، ثم عدل إعداداته محليًا. لا تضع ملف `.env` في Git:

   ```powershell
   Copy-Item .env.example .env
   ```

   اجعل قيم الاتصال المحلية مناسبة لخادم MySQL الذي أعددته: `DB_CONNECTION=mysql`، و`DB_HOST`، و`DB_PORT`، و`DB_DATABASE`، و`DB_USERNAME`، و`DB_PASSWORD`. لا تنسخ كلمات مرور أو مفاتيح حقيقية إلى README أو المستودع.
4. أنشئ مفتاح التطبيق وشغّل الترحيلات على قاعدة البيانات المحددة:

   ```powershell
   php artisan key:generate
   php artisan migrate
   ```

   راجع الترحيلات والنسخة الاحتياطية قبل تطبيق تغييرات على قاعدة تحتوي بيانات. لا تستخدم `migrate:fresh` أو `db:wipe` على قاعدة قائمة.
5. شغّل API محليًا:

   ```powershell
   php artisan serve --host=127.0.0.1 --port=8000
   ```

   يصبح عنوان API الافتراضي المستخدم في الواجهة `http://127.0.0.1:8000/api`.

### ثانيًا: Frontend (Next.js)

1. افتح نافذة طرفية أخرى من مجلد `Frontend` وثبّت الاعتماديات المقفلة:

   ```powershell
   cd Frontend
   npm ci
   ```

2. لا يوجد `Frontend/.env.example` حاليًا. عند الحاجة لتغيير عنوان API، أنشئ `Frontend/.env.local` وضع فيه عنوان API الأساسي فقط، مثل:

   ```dotenv
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
   ```

   متغير `NEXT_PUBLIC_` متاح في كود المتصفح؛ لا تضع فيه أسرارًا.
3. شغّل واجهة التطوير:

   ```powershell
   npm run dev
   ```

   أو تحقق من بناء الإنتاج محليًا باستخدام `npm run build` ثم `npm run start`. يحدد Next.js عنوان الموقع الذي يظهر في الطرفية عند بدء التشغيل.
4. إذا كانت الواجهة والـ API على أصلين مختلفين، تأكد من إعداد CORS في بيئة Laravel للسماح بأصل الواجهة المطلوب. لم يعرّف `routes/api.php` إعدادات CORS خاصة بكل مسار.

## 7. حسابات الدخول والصلاحيات

- يستخدم تسجيل الدخول `POST /api/login` البريد وكلمة المرور، ويتحقق منهما باستخدام تجزئة Laravel. عند النجاح ينشئ Sanctum Bearer Token بصلاحية مرتبطة بدور المستخدم، ويعيد التوكن وبيانات المستخدم. لا يوثق هذا الملف بيانات دخول أو كلمات مرور.
- ترسل الواجهة التوكن في ترويسة `Authorization: Bearer ...` للمسارات المحمية، ويعيد `GET /api/me` المستخدم الحالي. `POST /api/logout` يحذف التوكن الحالي.
- الأدوار المعرفة في migration المستخدمين هي `admin` و`employee`. يسمح تسجيل الدخول بهذين الدورين.
- الموظف والمدير يستطيعان استخدام إدارة الغرف والخدمات والطلبات والرسائل والإحصاءات بحسب مجموعات `role:admin,employee` في المسارات.
- التقارير وتصديرها وإدارة الموظفين مقصورة على `admin` عبر `role:admin`.
- حساب المدير أو الموظف الفعلي يُنشأ ويُدار وفق سياسة تشغيل آمنة خارج هذا التوثيق. لا تعتمد على بيانات اعتماد افتراضية منشورة في مستودع عام؛ غيّر أي بيانات تجريبية قبل النشر.

## 8. النشر والصيانة

### النشر للإنتاج

1. اختر بيئات تشغيل متوافقة مع متطلبات PHP وNode.js أعلاه، وخادم MySQL مناسبًا لسياسة التشغيل. خطوات النشر مستقلة عن مزود استضافة بعينه.
2. انشر `backend` و`Frontend` كتطبيقين منفصلين، واضبط ملفات البيئة على قيم الإنتاج عبر مدير أسرار أو إعدادات بيئة الخادم. لا ترفع `.env` أو كلمات مرور أو مفاتيح إلى Git.
3. في Laravel، ثبّت الاعتماديات الإنتاجية، اضبط `APP_ENV=production` و`APP_DEBUG=false`، وأنشئ مفتاح التطبيق بطريقة آمنة، واضبط الاتصال بقاعدة البيانات والبريد/التخزين عند الحاجة الفعلية. خذ نسخة احتياطية قبل ترحيلات الإصدار، ثم طبّق الترحيلات المعتمدة باستخدام `php artisan migrate --force`.
4. شغّل Laravel عبر خادم تطبيقات PHP وخادم ويب مناسبين لبيئتك، واجعل جذر الموقع يشير إلى `backend/public`؛ لا تستخدم `php artisan serve` كخادم إنتاج.
5. في `Frontend` نفذ `npm ci` و`npm run build`، ثم شغّل التطبيق المبني باستخدام `npm run start` ضمن مدير عمليات ملائم للبيئة.
6. اضبط `NEXT_PUBLIC_API_URL` على عنوان API الإنتاجي الكامل المنتهي بـ`/api`، واسمح لأصل الواجهة عبر CORS إذا كان مختلفًا. ضع الواجهة والـ API خلف HTTPS، واضبط النطاقات والشهادات وسياسات الكوكيز/التوكن بما يناسب النشر.
7. تحقق بعد النشر من مسارات الصحة والتسجيل والمصادقة والعمليات الأساسية، وراقب السجلات دون تسجيل التوكنات أو كلمات المرور.

### الصيانة وحماية البيانات

- حدّث PHP وNode.js واعتماديات Composer وnpm على دفعات مراجعة، وراجع ملفات القفل وسجلات التغييرات قبل النشر.
- خذ نسخًا احتياطية مشفرة ومنتظمة لقاعدة البيانات، واختبر الاستعادة، وحدد مدة الاحتفاظ وصلاحيات الوصول.
- أضف migrations جديدة للتعديلات على المخطط، وراجع أثرها على البيانات وأخذ نسخة احتياطية قبل التنفيذ. لا تستخدم أوامر إعادة إنشاء قاعدة البيانات على البيانات القائمة.
- راجع سجلات Laravel وسجلات خادم الويب وعمليات Next.js دوريًا، واحمها من الوصول العام واحذف أو احجب البيانات الحساسة.
- استخدم HTTPS، وأقل صلاحيات ممكنة لحساب قاعدة البيانات، وأسرار بيئية خارج المستودع، وغيّر بيانات أي حسابات أو مفاتيح تجريبية قبل إتاحة النظام.

## 9. معلومات المشروع والتطوير المستقبلي

يحتوي المستودع على تطبيق Next.js وLaravel API وترحيلات قاعدة بيانات واختبارات Laravel نموذجية. وبحسب ملفات الاختبارات الحالية، توجد اختبارات مثال لوحدة وميزة؛ لا يثبت وجودها وحده تغطية شاملة لتدفقات النظام.

### فرص التطوير التالية

- إضافة اختبارات Feature لتسجيل الدخول والخروج والصلاحيات وتدفقات الغرف والخدمات والطلبات والرسائل والتقارير.
- إضافة توثيق آلي للعقود والـ API والتحقق من توافق المدخلات والاستجابات مع الواجهة.
- توحيد صفحات الإدارة المتكررة بين المسارات المتاحة بعد مراجعة أثر ذلك على الروابط الحالية.
- إضافة إجراءات مساهمة واضحة (مثل أسلوب الفروع والمراجعة) إذا بدأ العمل الجماعي على المستودع.

تُنفذ المساهمات المستقبلية مع الحفاظ على ترحيلات البيانات الموجودة، وإضافة اختبارات مناسبة، وعدم إدراج ملفات البيئة أو الأسرار أو البيانات الحقيقية في التغييرات.
