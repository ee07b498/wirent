<?php

namespace App\Http\Middleware;

use Closure;

class CustomerLoginStatus
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
        if (app('session')->has('LLEmail')&&app('session')->get('landlord_login_status')==true)
		{
			$request->merge(array(	"LLID" => app('session')->get("LLID"),
									"LLEmail" => app('session')->get("LLEmail")
								));									
	        return $next($request);
		}
		return view('page.login');			
    }
}