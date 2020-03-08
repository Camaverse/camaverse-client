<template lang="pug">
    footer.footer-global.bg-dark.text-light
        ad-space
        .container
            b-navbar(type='dark')
                b-navbar-brand(to='/') Camaverse
            .row.block-links
                .col-6.col-md-3
                    | Support
                    a(href="", target="_blank") Billing
                    a(href="", target="_blank") Contact Us
                    a(href="", target="_blank") Feedback
                .col-6.col-md-3
                    | Partners
                    a(href="", target="_blank") Make Money
                    a(href="", target="_blank") Streamers
                    a(href="", target="_blank") Studios
                    a(href="", target="_blank") Affiliates
                    a(href="", target="_blank") Buy Traffic
                    a(href="", target="_blank") Contributors
                .col-md-3.col-sm-6
                    | Business
                    a(href="", target="_blank") Events
                    a(href="", target="_blank") Media
                    a(href="", target="_blank") Jobs
                .col-md-3.col-sm-6
                    | Legal
                    a(href="", target="_blank") Law Enforcement
                    a(href="", target="_blank") Terms & Conditions
                    a(href="", target="_blank") Privacy Policy
                    a(href="", target="_blank") Cookies
                    a(href="", target="_blank") Anti-Spam
                    a(href="", target="_blank") Refunds

        .footer-legal.text-center
            p Main Office: Virginia, USA
            p This site contains sexually explicit material. Enter ONLY if you are at least 18 years old and agree to our cookie rules.
            p
                a.text-light(href="", target="_blank") 18 U.S.C. 2257 Record Keeping Requirements Compliance Statement
            p &copy; 2019 - {{new Date().getFullYear()}} Camaverse.com. All Rights Reseerved
        cookie-law(@accept="cookieAccepted()")
            div(slot="message")
                div
                | This website uses cookies, local storage and session storage to enhance your experience and collect
                | statistical data.
                br
                | For more information please click on the following our cookie policy.
                br
                | By continuing to browse on this website, you accept the use of cookies for the above purposes.
</template>
<script>
import AdSpace from '@/components/AdSpace'
import AppInit from '../mixins/appInit.mixin'
import CookieLaw from 'vue-cookie-law'
export default {
  components: {
    AdSpace,
    CookieLaw
  },
  methods: {
    cookieAccepted: function () {
      this.storageDataInit()
    }
  },
  mixins: [AppInit]
}
</script>
<style lang="scss">
    .block-links a {
        display: block;
    }
    .footer-global {
        a {
            color: #3d9264;
        }
        .navbar {
            padding: 0 10px 0 0;
        }
    }
    .footer-legal {
        background-color: #001016;
        font-size: .8em;
        margin-top: 20px;
        padding: 20px 0;
        p {
            margin: 0;
        }
    }
</style>
