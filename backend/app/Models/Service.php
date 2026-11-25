<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Service extends Model { protected $fillable=['name','category','description','price','image','is_available']; protected $casts=['is_available'=>'boolean','price'=>'decimal:2']; public function orderItems(){return $this->hasMany(OrderItem::class);} }
