import React from 'react';
import ToolBar from '../../components/management/ToolBar';

function NotFound() {
    const logo = '/logo.jpg';
    const title = 'Page not found';
    const article = 'Sorry, the page you are looking for could not be found or has been removed.';
    return (
        <div className='flex flex-col w-full'>
            <ToolBar title='Not Found' />
            <div className='flex h-full px-4 items-center md:px-8 bg-white rounded-br-2xl'>
                <div className='max-w-lg mx-auto text-center mt-[-5rem]'>
                    <div className='pb-6'>
                        <img src={logo} width={150} className='mx-auto' />
                    </div>
                    <p className='text-gray-800 text-3xl font-semibold'>{title}</p>
                    <p className='text-gray-600 mt-3'>{article}</p>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
