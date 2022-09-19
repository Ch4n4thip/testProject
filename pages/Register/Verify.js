import Link from "next/link";
import Navbar from "../../Components/Navbar/navLogin";
import styles1 from './Verify.module.css'
export default function Verify() {
    return (
        <>
        <Navbar/> 
        

        <form class="otc" name="one-time-code" action="#">
      <fieldset>
        <legend>Validation Code</legend>
        <label for="otc-1">Number 1</label>
        <label for="otc-2">Number 2</label>
        <label for="otc-3">Number 3</label>
        <label for="otc-4">Number 4</label>
        <label for="otc-5">Number 5</label>
        <label for="otc-6">Number 6</label>
    
        <div>
          <input type="number" pattern="[0-9]*"  value="" inputtype="numeric" autocomplete="one-time-code" id="otc-1" required/>
    
          <input type="number" pattern="[0-9]*"  value="" inputtype="numeric" id="otc-2" required/>
          <input type="number" pattern="[0-9]*"  value="" inputtype="numeric" id="otc-3" required/>
          <input type="number" pattern="[0-9]*"  value="" inputtype="numeric" id="otc-4" required/>
          <input type="number" pattern="[0-9]*"  value="" inputtype="numeric" id="otc-5" required/>
          <input type="number" pattern="[0-9]*"  value="" inputtype="numeric" id="otc-6" required/>
        </div>
      </fieldset>
    </form>


    </>
    );
  }


