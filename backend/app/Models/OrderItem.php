<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class OrderItem extends Model { protected $fillable=['order_id','service_id','service_name','quantity','unit_price','notes']; public function service(){return $this->belongsTo(Service::class);} }
