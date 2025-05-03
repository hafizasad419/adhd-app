import AuthRoutes from './AuthRoutes'
import { Suspense } from 'react'
import Fallback from '@src/Components/Fallback'
import ProtectedRoutes from './ProtectedRoutes'


function BaseRoutes({ user }: any) {

    return (
        <Suspense fallback={<Fallback />}>
            <>
                {
                    user ? (
                        <>
                            <ProtectedRoutes />
                        </>
                    )
                        :
                        (
                            <>
                                <AuthRoutes />
                            </>
                        )

                }
            </>
        </Suspense>
    )
}

export default BaseRoutes






