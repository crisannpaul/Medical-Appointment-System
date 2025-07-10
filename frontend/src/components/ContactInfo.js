// src/components/ContactInfo.js
import React from "react";

const ContactInfo = () => (
    <section style={{marginTop: 48, textAlign: "center", lineHeight: 1.6}}>
        <h2>Contact Us</h2>

        {/* phone */}
        <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+15551234567">(555) 123-4567</a>
        </p>

        {/* e-mail */}
        <p>
            <strong>E-mail:</strong>{" "}
            <a href="mailto:hello@lh-medical.com">hello@lh-medical.com</a>
        </p>

        {/* address */}
        <p>
            <strong>Address:</strong><br/>
            42 Wellness Way<br/>
            Healthy City, CA 90210
        </p>
    </section>
);

export default ContactInfo;
