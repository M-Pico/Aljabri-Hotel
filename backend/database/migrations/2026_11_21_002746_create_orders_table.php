<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

public function up(): void
{
    Schema::create('orders', function (Blueprint $table) {
        $table->id();
        $table->foreignId('room_id')->constrained('rooms')->cascadeOnDelete();
        $table->string('order_number')->unique();
        $table->enum('order_type', ['خدمات الغرف', 'المغسلة', 'الكافيه']);
        $table->enum('status', ['جديد', 'قيد المعالجة', 'مكتمل', 'ملغي'])->default('جديد');
        $table->text('notes')->nullable();
        $table->timestamp('completed_at')->nullable();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
