import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {

    return (
        <div>
            <footer className="">
                <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                    <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-black">
                        تم تطويره بواسطة <span className='text-yellow-700' > <a href="https://github.com/MaisGhaith" target='_blank'>Mais Ghaith</a> </span>
                    </p>
                    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                        <li>
                            <Link
                                className="text-black transition hover:text-gray-700/75"
                                to="/AboutUs"
                            >
                                من نحن
                            </Link>
                        </li>


                        <li>
                            <Link
                                className="text-black transition hover:text-gray-700/75"
                                to="#Services"
                            >
                                خدماتنا
                            </Link>
                        </li>

                        <li>
                            <Link
                                className="text-black transition hover:text-gray-700/75"
                                to="/ContactUs"
                            >
                                تواصل معنا
                            </Link>
                        </li>
                    </ul>

                </div>
            </footer>
        </div>

    )
}

export default Footer