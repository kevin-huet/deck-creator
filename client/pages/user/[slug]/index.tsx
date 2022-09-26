import type { NextPage } from 'next'
import { Button } from '@mantine/core';
import {useRouter} from "next/router";

const User: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    return (
        <>
            <Button>{slug}</Button>
        </>
    )
}

export default User;