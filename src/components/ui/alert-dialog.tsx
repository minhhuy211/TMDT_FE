// components/ui/alert-dialog.tsx
"use client"

import * as React from "react"
import * as RadixAlertDialog from "@radix-ui/react-alert-dialog"
import { cn } from "../admin-ts/utils"

const AlertDialog = RadixAlertDialog.Root
const AlertDialogTrigger = RadixAlertDialog.Trigger
const AlertDialogPortal = RadixAlertDialog.Portal

const AlertDialogOverlay = React.forwardRef<
    React.ElementRef<typeof RadixAlertDialog.Overlay>,
    React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Overlay>
>(({ className, ...props }, ref) => (
    <RadixAlertDialog.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
            className
        )}
        {...props}
    />
))
AlertDialogOverlay.displayName = RadixAlertDialog.Overlay.displayName

const AlertDialogContent = React.forwardRef<
    React.ElementRef<typeof RadixAlertDialog.Content>,
    React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Content>
>(({ className, ...props }, ref) => (
    <AlertDialogPortal>
        <AlertDialogOverlay />
        <RadixAlertDialog.Content
            ref={ref}
            className={cn(
                "fixed z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900",
                "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                className
            )}
            {...props}
        />
    </AlertDialogPortal>
))
AlertDialogContent.displayName = RadixAlertDialog.Content.displayName

const AlertDialogHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4">{children}</div>
)
const AlertDialogFooter = ({ children }: { children: React.ReactNode }) => (
    <div className="mt-6 flex justify-end gap-2">{children}</div>
)

const AlertDialogTitle = RadixAlertDialog.Title
const AlertDialogDescription = RadixAlertDialog.Description
const AlertDialogCancel = RadixAlertDialog.Cancel
const AlertDialogAction = RadixAlertDialog.Action

export {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
}
