import React from 'react'

function Test() {
  return (
    <div className='w-[600px] mx-auto p-5 bg-slate-400 rounded-2xl m-5'>
        <input type="text" placeholder="enter your name" class="border rounded-lg p-2 mb-4 w-full" />
<input type="email" placeholder="enter your email address" class="border rounded-lg p-2 mb-4 w-full" />
<input type="tel" placeholder="enter your mobile number" class="border rounded-lg p-2 mb-4 w-full" />
<textarea placeholder="type here.." class="border rounded-lg p-2 mb-4 w-full"></textarea>
<input type="checkbox" class="mr-2" /> allow privacy policy 

              <select class="border rounded-lg p-2 mb-4 w-full">
                <option value="TATA">TATA</option>
<option value="HYUNDAI">HYUNDAI</option>
<option value="MARUTI">MARUTI</option>
<option value="TESLA">TESLA</option>
<option value="AUDI">AUDI</option>
<option value="MARUTI">MARUTI</option>
              </select>
<button class="bg-blue-500 text-white p-2 rounded-lg">SUBMIT</button>
    </div>
  )
}

export default Test