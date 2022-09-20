import React ,{useMemo}from "react";
import { RE_DIGIT } from "./constants";
import styles1 from './verify.module.css'



// type Props {
// 	value: string;
// 	valueLength:number;
// 	onChange: (value: string) ==> void;
//   };
type Props = {
	value: string;
	valueLength:number;
	onChange: (value: string) => void;
	}
export default function OneTime({value,valueLength,onChange}: Props) {
	
	const valueItem = useMemo(() => {
	const valueArray = value.split(''); //  [1,2,3]
	const items: Array<string> = [];
		for (let i = 0; i < valueLength; i++) {
			const char = valueArray[i];
			// const re = new RegExp(/^\d+$/);
		
			if( RE_DIGIT.test(char)) {
				items.push(char);
			}else{
				items.push('');
			}
		}



			return items;
		
	},[value,valueLength]);
	const focusToNextInput = (target: HTMLInputElement) => {
		const nextElementSibling = target.nextElementSibling as HTMLInputElement;
		if(nextElementSibling){
			(nextElementSibling as HTMLInputElement).focus();
		}
	}
	const focusToPrevInput = (target: HTMLInputElement) => {
		const previousElementSibling = target.previousElementSibling as HTMLInputElement;
		if(previousElementSibling){
			(previousElementSibling as HTMLInputElement).focus();
		}
	}
	const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
		const target = e.target;
		let targetValue = target.value.trim();
		const isTargetValueDigit = RE_DIGIT.test(targetValue);
		if(!isTargetValueDigit && targetValue !== '') {
			return ;
		}
		targetValue = isTargetValueDigit ? targetValue : '';

		const isTargetValueLength = targetValue.length ;
		if(isTargetValueLength === 1) {
			const newValue = value.substring(0,idx) + targetValue + value.substring(idx+1);
				onChange(newValue);
			if(!isTargetValueDigit ) {
				return;
			}
			const nextElementSibling = target.nextElementSibling as HTMLInputElement;
			if(nextElementSibling){
				(nextElementSibling as HTMLInputElement).focus();
		}
		}else if(isTargetValueLength === valueLength){
			onChange(targetValue);

			target.blur();
		}


		const newValue = value.substring(0,idx) + targetValue + value.substring(idx+1);
		onChange(newValue);
		if(!isTargetValueDigit ) {
			return;
		}
		const nextElementSibling = target.nextElementSibling as HTMLInputElement;
		if(nextElementSibling){
			(nextElementSibling as HTMLInputElement).focus();
		}

		
	}
	const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const {key} = e;
		const target = e.target as HTMLInputElement;
		const targetValue = target.value;
		if(key === 'ArrowRight' || key === 'ArrowDown') {
			e.preventDefault();
			return focusToNextInput(target);
			
		}
		if(key === 'ArrowLeft' || key === 'ArrowUp') {
			e.preventDefault();
			return focusToPrevInput(target);
			
		}
		target.setSelectionRange(0, target.value.length);
		if(e.key === 'Backspace' && targetValue === '') {
			return focusToPrevInput(target);
		}
	}
	const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		const {target} = e;
		target.setSelectionRange(0, target.value.length);
	}
  return (
    <div className={styles1.otpgroup}>
      {valueItem.map((digit, idx) => (
        <input 
			key={idx} 
			type="text" 
			inputMode="numeric" 
			autoComplete="one-time-code"
			pattern="\d{1}"
			maxLength={valueLength}
			className={styles1.otpinput}
			value={digit}
			onChange={(e) => inputOnChange(e, idx)}
			onKeyDown={inputOnKeyDown}
			onFocus={inputOnFocus}
		/>
		
      ))}
	</div>
  );
}

































// let in1 = document.getElementById('otc-1'),
//     ins = document.querySelectorAll('input[type="number"]');

// ins.forEach(function(input) {
// 	/**
// 	 * Control on keyup to catch what the user intent to do.
// 	 * I could have check for numeric key only here, but I didn't.
// 	 */
// 	input.addEventListener('keyup', function(e){
// 		// Break if Shift, Tab, CMD, Option, Control.
// 		if (e.keyCode === 16 || e.keyCode == 9 || e.keyCode == 224 || e.keyCode == 18 || e.keyCode == 17) {
// 			 return;
// 		}

// 		// On Backspace or left arrow, go to the previous field.
// 		if ( (e.keyCode === 8 || e.keyCode === 37) && this.previousElementSibling && this.previousElementSibling.tagName === "INPUT" ) {
// 			this.previousElementSibling.select();
// 		} else if (e.keyCode !== 8 && this.nextElementSibling) {
// 			this.nextElementSibling.select();
// 		}
// 	});

// 	input.addEventListener('focus', function(e) {
// 		// If the focus element is the first one, do nothing
// 		if ( this === in1 ) return;

// 		// If value of input 1 is empty, focus it.
// 		if ( in1.value == '' ) {
// 			in1.focus();
// 		}

// 		// If value of a previous input is empty, focus it.
// 		// To remove if you don't wanna force user respecting the fields order.
// 		if ( this.previousElementSibling.value == '' ) {
// 			this.previousElementSibling.focus();
// 		}
// 	});
// });

// in1.addEventListener('input', function(e) {
// 	let data = e.data || this.value; // Chrome doesn't get the e.data, it's always empty, fallback to value then.
// 	if ( ! data ) return; // Shouldn't happen, just in case.
// 	if ( data.length === 1 ) return; // Here is a normal behavior, not a paste action.

// 	for (i = 0; i < data.length; i++ ) {
// 		ins[i].value = data[i];
// 	}
// });
