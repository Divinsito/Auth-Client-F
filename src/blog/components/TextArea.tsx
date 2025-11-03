
import { TextareaHTMLAttributes, forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string | FieldError;
  maxLength: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, maxLength, ...props }, ref) => {

    const errorMessage = typeof error === 'string' ? error : error?.message;
    const isInvalid = !!errorMessage;
    const [charCount, setCharCount] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);

        if (props.onChange) {
            props.onChange(e);
        }
    };

    return (
      <div>
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <textarea
          ref={ref}
          id={props.id || props.name}
          className={`w-full p-2 border mt-1 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            isInvalid ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={isInvalid ? 'true' : 'false'}
          maxLength={maxLength}

          onChange={handleChange} 
          {...props}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
            {isInvalid && (
                <small className="text-red-500" role="alert">
                    {errorMessage}
                </small>
            )}
            {}
            <span className={`ml-auto ${charCount > maxLength * 0.9 ? 'text-red-500' : ''}`}>
                {charCount}/{maxLength}
            </span>
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
export default TextArea;
