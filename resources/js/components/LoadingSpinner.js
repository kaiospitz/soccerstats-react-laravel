import React from 'react'

/**
 * LoadingSpinner:
 * Loading spinner to be loaded while waiting for a fetch to complete
 */
const LoadingSpinner = () => {
    return (
        <div id="loadingSpinner" className="box">
            <div className="shadow"></div>
            <div className="gravity">
                <div className="ball"></div>
            </div>
        </div>
    )
}

export default LoadingSpinner
