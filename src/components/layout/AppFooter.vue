<template>
    <footer class="footer ">
        <div class="container">
            <div class="footer__top">
                <div class="footer__store">
                    <icon-base
                        icon-name="logo"
                        width="156"
                        height="56"
                    />
                    <p class="footer__description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div
                        id="download"
                        class="footer__store-links"
                    >
                        <a
                            href="https://play.google.com/store/games"
                            class="footer__link"
                            target="”_blank”"
                        >
                            <icon-base
                                icon-name="googleStore"
                                width="22"
                                height="22"
                            />
                            <p class="footer__link-store-text">PlayStore</p>
                        </a>

                        <a
                            href="https://www.apple.com/ru/app-store/"
                            class="footer__link"
                            target="”_blank”"
                        >
                            <icon-base
                                icon-name="appleStore"
                                width="22"
                                height="22"
                            />
                            <p class="footer__link-store-text">AppleStore</p>
                        </a>
                    </div>
                </div>

                <div class="footer__links-group">
                    <div
                        v-if="footerCompanyNav.length"
                        class="footer__company-links"
                    >
                        <h3 class="footer__company-links-title">
                            Company
                        </h3>
                        <router-link
                            v-for="link in footerCompanyNav"
                            :key="link.text"
                            :to="link.path"
                            class="footer__company-link"
                        >
                            {{ link.text }}
                        </router-link>
                    </div>

                    <div
                        v-if="footerHelperNav.length"
                        class="footer__company-links"
                    >
                        <h3 class="footer__company-links-title">
                            Helper Center
                        </h3>
                        <router-link
                            v-for="link in footerHelperNav"
                            :key="link.text"
                            :to="link.path"
                            class="footer__company-link"
                        >
                            {{ link.text }}
                        </router-link>
                    </div>

                    <address class="footer__contact">
                        <h3 class="footer__company-links-title">
                            Contact Info
                        </h3>
                        <div class="footer__addressLinks">
                            <a
                                class="footer__company-link"
                                href="tel:1234567890"
                            >Phone: 1234567890</a>
                            <a
                                class="footer__company-link"
                                href="mailto:company@email.comt"
                            >Email: company@email.comt</a>
                            <a
                                class="footer__company-link"
                                href="https://www.google.com/maps/search/100+Smart+Street,
                                +LA,+USA/@34.0309365,-118.4771831,11z/data=!3m1!4b1?entry=ttu"
                                target="_blank"
                            >Location: 100 Smart Street, LA, USA</a>

                            <div class="footer__socialLinks">
                                <a
                                    href="https://facebook.com/"
                                    target="_blank"
                                    class="footer__social-link"
                                >
                                    <icon-base
                                        icon-name="fb_icon"
                                        width="24"
                                        height="24"
                                    />
                                </a>
                                <a
                                    target="_blank"
                                    href="https://twitter.com/"
                                    class="footer__social-link"
                                >
                                    <icon-base
                                        icon-name="twitter_icon"
                                        width="27"
                                        height="22"
                                    />
                                </a>
                                <a
                                    target="_blank"
                                    href="https://www.instagram.com/"
                                    class="footer__social-link"
                                >
                                    <icon-base
                                        icon-name="insta_icon"
                                        width="24"
                                        height="24"
                                    />
                                </a>
                                <a
                                    target="_blank"
                                    href="https://linkedin.com/"
                                    class="footer__social-link"
                                >
                                    <icon-base
                                        icon-name="linkedin_icoon"
                                        width="24"
                                        height="24"
                                    />
                                </a>
                            </div>
                        </div>
                    </address>
                </div>
            </div>
            <div />
        </div>
        <hr>
        <div class="container">
            <div class="footer__bottom">
                <div>
                    <p>© 2022 thecreation.design | All rights raserved</p>
                </div>
                <div>
                    <p>Created with love by thecreation.design</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import IconBase from '@/components/ui/IconBase.vue';
import { footerCompanyNav, footerHelperNav } from '@/router/routerConfig';

</script>

<style scoped lang="scss">

.footer {
  background-color: $bg-color-primary;

  .footer__top {
    padding: 70px 0 200px;
    display: flex;
    gap: 50px;

    @media only screen and (max-width: 1336px) {
      justify-content: space-between;
    }

    @media only screen and (max-width: 1024px) {
      flex-direction: column;
      padding: 70px 0 100px;
    }

    .footer__store {
      width: 380px;

      @media only screen and (max-width: 1336px) {
        width: 320px;
      }

      @media only screen and (max-width: 1024px) {
        width: 100%;
      }

      .footer__description {
        font-size: $font-size-md;
        color: $text-color-secondary;
        font-weight: 400;
        padding: 30px 0;
      }

      .footer__store-links {
        display: flex;
        gap: 15px;

        @media only screen and (max-width: 425px) {
          flex-direction: column;
        }

        .footer__link {
          width: 172px;
          height: 52px;
          background-color: $bg-color-button;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;

          @media only screen and (max-width: 425px) {
            width: 100%;
          }

          &:hover {
            transform: scale(1.05);
          }

          .footer__link-store-text {
            font-weight: 600;
            color: $text-color-main;
            padding-left: 10px;
          }
        }
      }
    }

    .footer__links-group {
      margin-top: 10px;
      display: flex;
      gap: 70px;

      @media only screen and (max-width: 1336px) {
        gap: 50px;
      }

      @media only screen and (max-width: 1024px) {
        justify-content: space-between;
      }

      @media only screen and (max-width: 768px) {
        flex-wrap: wrap;
        justify-content: center;
        gap: 30px;
      }

      @media only screen and (max-width: 425px) {
        flex-direction: column;
      }

      .footer__company-link {
        font-weight: 500;
        font-size: $font-size-md;
        color: $text-color-main;

        &:hover {
          text-decoration: underline;
        }
      }

      .footer__company-links {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .footer__company-links-title {
          font-size: $font-size-lg;
        }
      }

      .footer__contact {
        font-style: normal;

        .footer__addressLinks {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;

          .footer__socialLinks {
            display: flex;
            gap: 15px;
            margin-top: 10px;
            align-items: center;

            @media only screen and (max-width: 425px) {
              margin-top: 30px;
              justify-content: center;
            }

            .footer__social-link{
              transition: 100ms;
              &:hover {
                transform: scale(1.1);
              }
            }
          }
        }
      }
    }
  }

  .footer__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    font-size: $font-size-lg;
    padding: 30px 0;

    @media only screen and (max-width: 1024px) {
      font-size: $font-size-md;
    }

    @media only screen and (max-width: 768px) {
      flex-direction: column-reverse;
      justify-content: center;
      text-align: center;

    }
    @media only screen and (max-width: 768px) {
      font-size: $font-size-sm;
      gap: 20px;
    }
  }
}

</style>
