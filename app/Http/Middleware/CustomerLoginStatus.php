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
        if (app('session')->has('CEmail')&&app('session')->get('customer_login_status')==true)
		{
			$request->merge(array(	"CID" => app('session')->get("CID"),
									"CEmail" => app('session')->get("CEmail"),
									"CCurrStat" => app('session')->get("CCurrStat"),
									"CLastContDate" => app('session')->get("CLastContDate")
								));				
	
					
	        return $next($request);
		}
		return view('page.login');			
    }
}