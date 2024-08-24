'use client'

import { arrow, autoPlacement, autoUpdate, flip, FloatingArrow, offset, safePolygon, shift, useDismiss, useFloating, useFocus, useHover, useInteractions, useRole } from "@floating-ui/react";
import { hash, randomBytes } from "crypto";
import { Ref, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
    name: string;
    abbreviation: string;
    categoryName: string;
    href: string;
    className?: string;
}

// The implementation of this component is inspired by this comment:
// https://github.com/tailwindlabs/headlessui/discussions/425#discussioncomment-5117609

const TIMEOUT_DURATION = 120
const CourseEntry = (props: Props) => {
    const arrowRef = useRef<SVGSVGElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { refs, floatingStyles, context, elements, update } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'top',
        middleware: [
            flip(),
            shift(),
            offset(10),
            arrow({
                element: arrowRef
            })
        ]
    });

    const hover = useHover(context, { handleClose: safePolygon() });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss,
    ]);

    const id = useId();


    useEffect(() => {
        if (isOpen && elements.reference && elements.floating) {
            const cleanup = autoUpdate(
                elements.reference,
                elements.floating,
                update,
            );
            return cleanup;
        }
    }, [isOpen, elements, update]);

    return (
        <>
            <td className="">
                {
                    <div id={id} role="tooltip" ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}
                        className={`bg-secondary-800 p-1.5 rounded-lg text-secondary-0 shadow-low dark:shadow-d-low w-max absolute top-0 left-0 ${isOpen ? '' : 'sr-only'}`}>
                        <FloatingArrow ref={arrowRef} context={context} className="fill-secondary-800" />
                        <span className="sr-only">category: {props.categoryName}. course name: </span>{props.name}
                    </div>
                }
                <a target="_blank" aria-describedby={id} ref={refs.setReference} {...getReferenceProps()} href={props.href} className={`flex mx-auto w-32 h-8 my-1 justify-center items-center rounded-md ${props.className ?? ''}`}>
                    {props.abbreviation}
                </a>
            </td>
        </>
    )
}

export default CourseEntry