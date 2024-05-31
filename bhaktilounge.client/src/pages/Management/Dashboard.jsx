import React from 'react';
import ToolBar from '../../components/management/ToolBar';
function Dashboard() {
    const logo = '/metabase.svg';
    const title = 'MetaBase Business Intelligence';
    const article = 'Visit';

    return (
        <div className='flex flex-col w-full'>
            <ToolBar title='Dashboard' />
            <div className='flex h-full px-4 items-center md:px-8 bg-white rounded-br-2xl'>
                <div className='max-w-lg mx-auto text-center mt-[-5rem]'>
                    <div className='pb-6'>
                        <img src={logo} width={150} className='mx-auto' />
                    </div>
                    <p className='text-gray-800 text-3xl font-semibold'>{title}</p>
                    <p className='text-gray-600 mt-3'>{article}</p>
                    <a className='text-blue-600 ' href='http://localhost:3000/'>
                        http://localhost:3000/
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
