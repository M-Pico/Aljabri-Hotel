<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Order extends Model { protected $fillable=['room_id','order_number','order_type','status','notes','completed_at']; protected $casts=['completed_at'=>'datetime']; public function room(){return $this->belongsTo(Room::class);} public function items(){return $this->hasMany(OrderItem::class);} }
