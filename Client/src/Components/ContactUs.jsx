import React, { useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocation, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import emailjs from '@emailjs/browser';

const ContactUs = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_c55wo9s', 'template_o42irtr', form.current, 'Y2ql7VUKULpZ6WPyk')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div>
            <>
                <div className="container my-24 px-6 mx-auto">
                    <section className=" mb-32 text-gray-800">
                        <div
                            className=" flex ring-deep-orange-200 relative overflow-hidden bg-no-repeat bg-cover"
                            style={{
                                backgroundPosition: "50%",
                                backgroundImage:
                                    'url("https://images.pexels.com/photos/190537/pexels-photo-190537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                                height: 300
                            }}
                        ></div>
                        <div className="container text-gray-800 px-4 md:px-12">
                            <div
                                className="block rounded-lg shadow-lg py-10 md:py-12 px-2 md:px-6"
                                style={{
                                    marginTop: "-100px",
                                    background: "hsla(0, 0%, 100%, 0.8)",
                                    backdropFilter: "blur(30px)"
                                }}
                            >

                                <section className=" px-4  relative  overflow-hidden  lg:py-[120px]">
                                    <div className=" container mx-auto">
                                        <div className=" sm:flex flex-wrap lg:justify-center">
                                            <div className="px-4 lg:w-1/2 xl:w-6/12 sm:w-full">
                                                <div className="mb-12 max-w-[570px] lg:mb-0 ">
                                                    <span className="text-yellow-300/90 mb-4 block text-xl font-semibold ">
                                                        اتصل بنا
                                                    </span>
                                                    <h2 className="text-dark mb-6 text-[32px] font-bold uppercase sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                                                        شاركنا بأفكارك
                                                    </h2>
                                                    <p className="text-body-color mb-9 text-base leading-relaxed">
                                                        نحن نعمل على تحسين خدماتنا بشكل دائم, ونسعى لتوفير أفضل الخدمات بأفضل الأسعار
                                                        ونرحب بكل ما رأي أو فكرة من شأنها المساعدة على تطوير موقعنا وخدماتنا
                                                    </p>
                                                    <div className="mb-8 flex w-full max-w-[370px]">
                                                        <FontAwesomeIcon className='mx-3 mt-2' icon={faMapLocation} size="2xl" style={{ color: "#facc15", }} />

                                                        <div className="w-full">
                                                            <h4 className="animate-pulse text-dark mb-1 text-xl font-bold">
                                                                موقعنا
                                                            </h4>
                                                            <p className="text-body-color text-base">
                                                                <a href="https://goo.gl/maps/3Hd3KfvsPn1oLcZn6?coh=178573&entry=tt" target="_blank">عَ الطريق</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="mb-8 flex w-full max-w-[370px]">
                                                        <FontAwesomeIcon className='mx-3 mt-2' icon={faPhone} size="2xl" style={{ color: "#facc13", }} />
                                                        <div className="w-full">
                                                            <h4 className="animate-pulse text-dark mb-1 text-xl font-bold">
                                                                رقم الهاتف
                                                            </h4>
                                                            <p className="text-body-color text-base">
                                                                <a href="tel:+962790012079">(+962)790012079</a>
                                                            </p>
                                                        </div>

                                                    </div>
                                                    <div className="mb-8 flex w-full max-w-[370px]">
                                                        <FontAwesomeIcon className='mx-3 mt-2' icon={faEnvelope} size="2xl" style={{ color: "#facc13", }} />

                                                        <div className="w-full">
                                                            <h4 className="animate-pulse text-black mb-1 text-xl font-bold">
                                                                البريد الإلكتروني
                                                            </h4>
                                                            <p className="text-body-color text-base">
                                                                <a href="mailto:3.altarig@gmail.com">3.altarig@gmail.com</a>
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="lg:w-1/2 px-4 xl:w-5/12 sm:w-auto">
                                                <div className="relative rounded-lg bg-white p-8 shadow-lg sm:p-12">
                                                    <form ref={form} onSubmit={sendEmail}>
                                                        <ContactInputBox
                                                            type="text"
                                                            name="user_name"
                                                            placeholder="الاسم"
                                                        />
                                                        <ContactInputBox
                                                            type="text"
                                                            name="user_email"
                                                            placeholder="الايميل"
                                                        />
                                                        <ContactTextArea
                                                            row="6"
                                                            placeholder="رسالتك"
                                                            name="message"
                                                            defaultValue=""
                                                        />
                                                        <div>
                                                            <button
                                                                value="Send"
                                                                type="submit"
                                                                className="w-full p-3 text-white transition border rounded border-primary bg-yellow-300/90 hover:bg-opacity-90"
                                                            >
                                                                إرسال
                                                            </button>
                                                        </div>
                                                    </form>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/* ====== Contact Section End */}
                            </div>
                        </div>




                    </section>
                </div>
            </>

        </div>
    )
}

export default ContactUs

const ContactTextArea = ({ row, placeholder, name, defaultValue }) => {
    return (
        <>
            <div className="mb-6">
                <textarea
                    rows={row}
                    placeholder={placeholder}
                    name={name}
                    className="border-[f0f0f0] w-full resize-none rounded border py-3 px-[14px] text-base text-body-color outline-none focus:border-yellow-300/90 focus-visible:shadow-none"
                    defaultValue={defaultValue}
                />
            </div>
        </>
    );
};

const ContactInputBox = ({ type, placeholder, name }) => {
    return (
        <>
            <div className="mb-6">
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    className="border-[f0f0f0] w-full rounded border py-3 px-[14px] text-base text-body-color outline-none focus:border-yellow-300/90 focus-visible:shadow-none"
                />
            </div>
        </>
    );
};