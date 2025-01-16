// import React from "react";
//
// const ContactForm: React.FC = () => {
//     return (
//         <div className="flex flex-col md:flex-row items-center justify-center m-auto gap-8 w-[90%]">
//             {/* Contact Info */}
//             <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6 text-gray-700">
//                 {/* Address */}
//                 <div className="mb-6">
//                     <div className="flex items-center mb-2">
//                         <span className="material-icons text-green-500">place</span>
//                         <p className="ml-2">2715 Ash Dr. San Jose, South Dakota 83475</p>
//                     </div>
//                 </div>
//
//                 {/* Email */}
//                 <div className="mb-6">
//                     <div className="flex items-center mb-2">
//                         <span className="material-icons text-green-500">email</span>
//                         <div className="ml-2">
//                             <p>Proxy@gmail.com</p>
//                             <p>Help.proxy@gmail.com</p>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Phone */}
//                 <div className="mb-6">
//                     <div className="flex items-center mb-2">
//                         <span className="material-icons text-green-500">phone</span>
//                         <div className="ml-2">
//                             <p>(219) 555-0114</p>
//                             <p>(164) 333-0487</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Contact Form */}
//             <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg p-6 text-gray-700">
//                 <h2 className="text-xl font-semibold mb-4">Just Say Hello!</h2>
//                 <p className="mb-6 text-sm text-gray-600">
//                     Do you fancy saying hi to us or want to get started with your car rental
//                     and need our help? Feel free to contact us.
//                 </p>
//                 <form>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                         {/* Name */}
//                         <input
//                             type="text"
//                             placeholder="Your Name"
//                             className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-green-500"
//                         />
//
//                         {/* Email */}
//                         <input
//                             type="email"
//                             placeholder="Your Email"
//                             className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-green-500"
//                         />
//                     </div>
//
//                     {/* Message */}
//                     <textarea
//                         placeholder="Your Message"
//                         className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-green-500 mb-4 h-24"
//                     />
//
//                     {/* Subjects */}
//                     <input
//                         type="text"
//                         placeholder="Subjects"
//                         className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-green-500 mb-4"
//                     />
//
//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         className="bg-green-500 text-white rounded py-2 px-4 w-full hover:bg-green-600"
//                     >
//                         Send Message
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };
//
// export default ContactForm;
import React, { useState } from "react";
import emailjs from "emailjs-com";
import {Mail, Phone, Place} from "@mui/icons-material";

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        emailjs
            .send(
                "service_dkohd68", // Replace with EmailJS service ID
                "template_f61b42r", // Replace with EmailJS template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                },
                "sYWdCzKGbeca1zv90" // Replace with EmailJS public key
            )
            .then(() => {
                setIsSent(true);
                setError(false);
                setFormData({ name: "", email: "", subject: "", message: "" });
            })
            .catch(() => {
                setError(true);
            });
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center mx-auto mb-6 gap-8 w-[90%]">
            {/* Contact Info */}
            <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6 text-gray-700">
                <div className="mb-6">
                    <div className="flex items-center mb-2 justify-between">
                        <div className="flex items-center flex-col">
                            <Place className="text-primary-blue"/>
                            <span className="material-icons text-primary-blue">Place</span>
                        </div>

                        <p className="ml-2 text-secondary-text w-[70%]">
                            Pharmacie EMIA, Rte de Melen, Yaoundé
                        </p>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="flex items-center mb-2 justify-between">
                        <div className="flex items-center flex-col">
                            <Mail className="text-primary-blue"/>
                            <span className="material-icons text-primary-blue">Email</span>
                        </div>

                        <div className="ml-2 w-[80%] sm:w-[70%]">
                            <a href="mailto:rentalreseau01@gmail.com" className="text-secondary-text hover:underline">
                                rentalreseau01@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center mb-2 justify-between">
                        <div className="flex items-center flex-col">
                        <Phone className="text-primary-blue"/>
                            <span className="text-primary-blue">Phone</span>
                        </div>

                        <div className="ml-2 text-secondary-text w-[70%]">
                            <p>+237 6 80 66 36 71</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg p-6 text-gray-700">
                <h2 className="text-xl font-semibold mb-4">Just Say Hello!</h2>
                <p className="mb-3 text-sm text-secondary-text">
                    Do you fancy saying hi to us or want to get started with your car rental and need our help? Feel free to contact us.
                </p>
                {isSent && <p className="text-green-500 mb-4">Message sent successfully!</p>}
                {error && <p className="text-red-500 mb-4">Failed to send message. Please try again.</p>}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-green-500"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-green-500"
                            required
                        />
                    </div>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-green-500 mb-4"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-green-500 mb-4 h-24"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-primary-blue text-white rounded py-2 px-4 w-full hover:bg-secondary-blue"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
