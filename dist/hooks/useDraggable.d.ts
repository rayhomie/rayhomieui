import React from 'react';
declare const useDraggable: () => {
    Ref: React.MutableRefObject<any>;
    MouseDown: (e: React.MouseEvent<Element, MouseEvent>) => void;
    MouseMove: (e: React.MouseEvent<Element, MouseEvent>) => void;
    MouseUp: (e: React.MouseEvent<Element, MouseEvent>) => void;
};
export default useDraggable;
