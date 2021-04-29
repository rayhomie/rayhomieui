import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/Input';
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => string[] | Promise<string[]>;
    onSelect?: (item: string) => void;
    renderOption?: (item: string) => ReactElement;
}
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
