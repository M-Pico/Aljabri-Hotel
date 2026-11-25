<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class CoreServicesSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['name' => 'تنظيف الغرفة', 'category' => 'خدمات الغرف', 'description' => 'تنظيف وترتيب الغرفة', 'price' => 0],
            ['name' => 'مناشف إضافية', 'category' => 'خدمات الغرف', 'description' => 'توفير مناشف إضافية للغرفة', 'price' => 0],
            ['name' => 'مستلزمات عناية', 'category' => 'خدمات الغرف', 'description' => 'مجموعة مستلزمات عناية شخصية', 'price' => 15],
            ['name' => 'وسادة إضافية', 'category' => 'خدمات الغرف', 'description' => 'وسادة إضافية حسب الطلب', 'price' => 0],
            ['name' => 'كابتشينو', 'category' => 'الكافيه', 'description' => 'كابتشينو محضر طازجًا', 'price' => 18, 'image' => '/cappuccino.png'],
            ['name' => 'قهوة سوداء', 'category' => 'الكافيه', 'description' => 'قهوة سوداء غنية بنكهة متوازنة', 'price' => 14, 'image' => '/black-coffee.png'],
            ['name' => 'عصير أفوكادو', 'category' => 'الكافيه', 'description' => 'عصير أفوكادو طازج', 'price' => 22, 'image' => '/avocado-juice.png'],
            ['name' => 'عصير كوكتيل', 'category' => 'الكافيه', 'description' => 'مزيج فواكه طازج', 'price' => 20, 'image' => '/cocktail-juice.png'],
            ['name' => 'كوكيز', 'category' => 'الكافيه', 'description' => 'كوكيز طازج مخبوز يوميًا', 'price' => 12, 'image' => '/cookies.png'],
            ['name' => 'حلا تشوكلت', 'category' => 'الكافيه', 'description' => 'حلى شوكولاتة غني', 'price' => 24, 'image' => '/chocolate-dessert.png'],
            ['name' => 'غسيل وكي', 'category' => 'المغسلة', 'description' => 'خدمة غسيل وكي للقطعة', 'price' => 18],
            ['name' => 'كي ملابس', 'category' => 'المغسلة', 'description' => 'كي القطعة بعناية', 'price' => 10],
            ['name' => 'تنظيف جاف', 'category' => 'المغسلة', 'description' => 'تنظيف جاف للقطعة', 'price' => 35],
            ['name' => 'دعم فني للشبكة', 'category' => 'خدمات الغرف', 'description' => 'مساعدة النزيل في الاتصال بشبكة الواي فاي', 'price' => 0],
        ];

        $cafeNames = collect($services)->where('category', 'الكافيه')->pluck('name')->all();
        Service::where('category', 'الكافيه')->whereNotIn('name', $cafeNames)->delete();

        foreach ($services as $service) {
            if ($service['category'] === 'الكافيه') {
                Service::updateOrCreate(
                    ['name' => $service['name'], 'category' => $service['category']],
                    [...$service, 'is_available' => true]
                );
            } else {
                Service::firstOrCreate(
                    ['name' => $service['name'], 'category' => $service['category']],
                    [...$service, 'is_available' => true]
                );
            }
        }
    }
}
