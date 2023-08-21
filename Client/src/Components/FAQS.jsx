import React, { useEffect, useState } from "react";
import axios from "axios";
const FAQS = () => {

    const [question, setQuestion] = useState("");
    const [name, setName] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5151/faqs/question",
                { user_name: name, question },
            );
            if (response.status === 200) {
                setResponseMessage("Question submitted successfully!");
                setQuestion("");
                setName("");
            }
        } catch (error) {
            console.error("Error submitting question:", error);
            setResponseMessage("An error occurred while submitting the question.");
        }
    };

    const [faqs, setFaqs] = useState([]);

    const fetchFaqs = async () => {
        try {
            const response = await axios.get('http://localhost:5151/faqs/faqs-get');
            setFaqs(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    return (
        <section className="relative z-20 overflow-hidden  pt-10 pb-12 lg:pt-5 lg:pb-[90px]">
            <div className="">
                <div className="p-10 flex justify-center flex-col items-center">
                    <span className=" mb-7 block text-4xl font-semibold text-white ">
                        الأسئلة الأكثر شيوعًا
                    </span>
                    <div className="-mx-4 flex items-center flex-wrap w-1/2">
                        {faqs.map((faq) => (
                            <div className="w-full px-4 " key={faq.id}>
                                <AccordionItem
                                    header={faq.question}
                                    text={faq.answer}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full flex flex-wrap justify-center">
                    <div className="w-fit px-12 ">
                        <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">

                            <h2 className="mb-8 text-3xl font-bold text-white sm:text-4xl md:text-[40px]">
                                اسألنا وسيقوم المسؤول بالرد :
                            </h2>
                            <form onSubmit={handleSubmit} className="flex flex-col items-center">

                                <input value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text" placeholder="الإسم" className="input input-bordered input-warning w-full max-w-md" />

                                <textarea
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="السؤال" className="textarea textarea-warning textarea-bordered textarea-lg w-full max-w-md mt-5" ></textarea>

                                <button className="btn btn-outline btn-warning mt-4 w-44">إرسال السؤال  </button>
                            </form>
                            {responseMessage && <p>{responseMessage}</p>}

                        </div>
                    </div>
                </div>


            </div>

            {/* <div className="absolute bottom-0 right-0 z-[-1]">
                <svg
                    width="1440"
                    height="886"
                    viewBox="0 0 1440 886"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        opacity="0.5"
                        d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
                        fill="url(#paint0_linear)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear"
                            x1="1308.65"
                            y1="1142.58"
                            x2="602.827"
                            y2="-418.681"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#3056D3" stopOpacity="0.36" />
                            <stop offset="1" stopColor="#F5F2FD" stopOpacity="0" />
                            <stop offset="1" stopColor="#F5F2FD" stopOpacity="0.096144" />
                        </linearGradient>
                    </defs>
                </svg>
            </div> */}
        </section>
    );
};

export default FAQS;

const AccordionItem = ({ header, text }) => {
    const [active, setActive] = useState(false);

    const handleToggle = () => {
        // event.preventDefault();
        setActive(!active);
    };
    return (
        <div className="single-faq mb-8 w-full rounded-lg border border-[#F3F4FE] bg-white p-4 sm:p-8 lg:px-6 xl:px-8">
            <button
                className={`faq-btn flex w-full text-left`}
                onClick={() => handleToggle()}
            >
                <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-yellow-300 text-primary">
                    <svg
                        className={`duration-200 ease-in-out fill-primary stroke-primary ${active ? "rotate-180" : ""
                            }`}
                        width="17"
                        height="10"
                        viewBox="0 0 17 10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                            fill=""
                            stroke=""
                        />
                    </svg>
                </div>

                <div className="w-full">
                    <h4 className="text-lg font-semibold text-black">{header}</h4>
                </div>
            </button>

            <div
                className={`pl-[62px] duration-200 ease-in-out ${active ? "block" : "hidden"
                    }`}
            >
                <p className="py-3 text-base leading-relaxed text-body-color">{text}</p>
            </div>
        </div>
    );
};
