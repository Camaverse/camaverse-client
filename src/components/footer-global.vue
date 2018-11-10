<template lang="pug">
    footer.footer-global.bg-dark.text-light
        .container
            b-navbar(type='dark')
                b-navbar-brand(to='/') Camaverse
                b-navbar-nav
                    b-nav-item(to='#')
                        v-icon(name='beer')
            .row.block-links
                .col-6.col-md-3
                    | Support
                    a(href='') Billing
                    a(href='') Contact Us
                    a(href='') Feedback
                .col-6.col-md-3
                    | Partners
                    a(href='') Make Money
                    a(href='') Streamers
                    a(href='') Studios
                    a(href='') Affiliates
                    a(href='') Buy Traffic
                    a(href='') Contributors
                .col-md-3.col-sm-6
                    | Business
                    a(href='') Events
                    a(href='') Media
                    a(href='') Jobs
                .col-md-3.col-sm-6
                    | Legal
                    a(href='') Law Enforcement
                    a(href='') Terms & Conditions
                    a(href='') Privacy Policy
                    a(href='') Cookies
                    a(href='') Anti-Spam
                    a(href='') Refunds

            .footer-legal.text-center
                p Main Office: Virginia, USA
                p This site contains sexually explicit material. Enter ONLY if you are at least 18 years old and agree to our cookie rules.
                p
                    a.text-light(href='') 18 U.S.C. 2257 Record Keeping Requirements Compliance Statement
                p &copy; 2019 - {{new Date().getFullYear()}} Camaverse.com. All Rights Reseerved
</template>
<style>
    .block-links a {
        display: block;
    }
    .footer-global {

    }
</style>