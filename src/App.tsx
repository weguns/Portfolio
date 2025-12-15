import React from 'react'
import {Dock, Navbar, Welcome} from '@components'

const App:React.FC = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />
        </main>
    )
}
export default App
