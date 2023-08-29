import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
const Features = () => {
    return (
        <div>
            <section className="py-10 sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-center text-3xl mb-16">
                        <p>المميزات</p>
                    </div>
                    <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
                        <div>
                            <div className="relative flex items-center justify-center mx-auto">
                                <svg
                                    className="text-green-100"
                                    width={66}
                                    height={68}
                                    viewBox="0 0 66 68"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z" />
                                </svg>
                                <svg
                                    className="absolute text-green-600 w-9 h-9"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-8 text-lg font-semibold text-black">
                                جلب من عتبة بابك
                            </h3>
                            <p className="mt-4 text-base text-gray-600">
                                نقدم خدمات إصلاح السيارات مباشرة إلى الموظفين المشغولين، خاصة النساء. نقوم بجلب مركباتهم عندما يحتاجون إلى صيانة أو إصلاحات، مما يوفر لهم الوقت والجهد اللازمين لزيارة ورشة الإصلاح.

                            </p>
                        </div>
                        <div>
                            <div className="relative flex items-center justify-center mx-auto">
                                <svg
                                    className="text-purple-100"
                                    width={66}
                                    height={68}
                                    viewBox="0 0 66 68"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z" />
                                </svg>
                                <svg
                                    className="absolute text-purple-600 w-9 h-9"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-8 text-lg font-semibold text-black">
                                الكفاءة الزمنية

                            </h3>
                            <p className="mt-4 text-base text-gray-600">
                                منصتنا توفر وقتًا ثمينًا للموظفين. بدلاً من البحث عن ورش إصلاح موثوقة أو الانتظار في الطوابير، يمكنهم التركيز على مسؤولياتهم بينما نهتم بصيانة سياراتهم.


                            </p>
                        </div>
                        <div>
                            <div className="relative flex items-center justify-center mx-auto">
                                <svg
                                    className="text-lime-100"
                                    width={62}
                                    height={65}
                                    viewBox="0 0 62 65"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M0 13.0264C0 33.4609 8.06546 64.0264 28.5 64.0264C48.9345 64.0264 62 50.4604 62 30.0259C62 9.59135 59.4345 4.0256 39 4.0256C18.5655 4.0256 0 -7.40819 0 13.0264Z" />
                                </svg>
                                <svg
                                    className="absolute text-lime-600 w-9 h-9"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-8 text-lg font-semibold text-black">
                                الدعم المتخصص
                            </h3>
                            <p className="mt-4 text-base text-gray-600">
                                ندرك أن الجميع ليسوا خبراء في السيارات. مهندسونا الماهرون يديرون جميع مهام الصيانة، مما يزيل القلق بشأن عدم الخبرة. يمكن للمستخدمين الاعتماد على محترفين للعناية بمركباتهم.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default Features