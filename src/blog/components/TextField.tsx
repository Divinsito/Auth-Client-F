
import { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';


interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | FieldError;
}


const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, ...props }, ref) => {

    const errorMessage = typeof error === 'string' ? error : error?.message;
    const isInvalid = !!errorMessage;

    return (
      <div>
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          ref={ref}
          id={props.id || props.name}
          className={`w-full p-2 border mt-1 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            isInvalid ? 'border-red-500' : 'border-gray-300'
          }`}

          aria-invalid={isInvalid ? 'true' : 'false'}
          {...props}
        />
        {isInvalid && (

          <small className="text-red-500 block mt-1" role="alert">
            {errorMessage}
          </small>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
export default TextField;
