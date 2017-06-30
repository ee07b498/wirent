<?php

namespace App\Http\Middleware;

use Closure;

class idTenant
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (app('session')->has('CEmail')&&app('session')->get('customer_login_status')==true)
		{
			$request->merge(array(	"CID" => app('session')->get("CID")
								));				
	
					
	        return $next($request);
		}

		return $request->merge(array(	
			"CID" => 0
								));
    }
}