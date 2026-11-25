<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Room extends Model { protected $fillable=['room_number','room_type','status','qr_code']; public function orders(){return $this->hasMany(Order::class);} }
