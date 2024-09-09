import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';


const NavBar = () => {

    const router = useRouter();

    return (  
        <>
            <Menu inverted attached>
                <Container>
                    <Menu.Item>
                        <Link  href={'/'}>
                            <Image
                                src='/favicon.ico' 
                                alt='Favicon' 
                                width={32} 
                                height={32} 
                                />
                        </Link>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button primary size='mini' onClick={() => router.push('/tasks/new')}>
                                New Task
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        </>
    );
}
 
export default NavBar;