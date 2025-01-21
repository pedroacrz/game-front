import React from 'react'
import './Modal.css'

function ModalProvider({ children }: { children: React.ReactNode }) {
    return (
        <div className='modalProvider'>
            {children}
        </div>
    )
}

export default ModalProvider