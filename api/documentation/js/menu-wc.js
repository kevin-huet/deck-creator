'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">hearthstone documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-1d145382d1c70331f56b953776cda0e313b90009dffbf9941e738ef2528e0ef4db62d5bcabb75713ca43bff563b2a7550b7e5b11432ab12814b485eb8d9f812b"' : 'data-target="#xs-controllers-links-module-AppModule-1d145382d1c70331f56b953776cda0e313b90009dffbf9941e738ef2528e0ef4db62d5bcabb75713ca43bff563b2a7550b7e5b11432ab12814b485eb8d9f812b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-1d145382d1c70331f56b953776cda0e313b90009dffbf9941e738ef2528e0ef4db62d5bcabb75713ca43bff563b2a7550b7e5b11432ab12814b485eb8d9f812b"' :
                                            'id="xs-controllers-links-module-AppModule-1d145382d1c70331f56b953776cda0e313b90009dffbf9941e738ef2528e0ef4db62d5bcabb75713ca43bff563b2a7550b7e5b11432ab12814b485eb8d9f812b"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-1d145382d1c70331f56b953776cda0e313b90009dffbf9941e738ef2528e0ef4db62d5bcabb75713ca43bff563b2a7550b7e5b11432ab12814b485eb8d9f812b"' : 'data-target="#xs-injectables-links-module-AppModule-1d145382d1c70331f56b953776cda0e313b90009dffbf9941e738ef2528e0ef4db62d5bcabb75713ca43bff563b2a7550b7e5b11432ab12814b485eb8d9f812b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-1d145382d1c70331f56b953776cda0e313b90009dffbf9941e738ef2528e0ef4db62d5bcabb75713ca43bff563b2a7550b7e5b11432ab12814b485eb8d9f812b"' :
                                        'id="xs-injectables-links-module-AppModule-1d145382d1c70331f56b953776cda0e313b90009dffbf9941e738ef2528e0ef4db62d5bcabb75713ca43bff563b2a7550b7e5b11432ab12814b485eb8d9f812b"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateCardCommand.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateCardCommand</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HearthstoneDataCommand.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HearthstoneDataCommand</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserCreateCommand.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCreateCommand</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-899fbb94611b579d9d0df5eaf1861004614cd8251cf0dc1b31b0f6ff961d07664fd9e8dc1f310a4ce0c00aec117bdc22acba6303d4e50f7b621016f199b1b28c"' : 'data-target="#xs-controllers-links-module-AuthModule-899fbb94611b579d9d0df5eaf1861004614cd8251cf0dc1b31b0f6ff961d07664fd9e8dc1f310a4ce0c00aec117bdc22acba6303d4e50f7b621016f199b1b28c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-899fbb94611b579d9d0df5eaf1861004614cd8251cf0dc1b31b0f6ff961d07664fd9e8dc1f310a4ce0c00aec117bdc22acba6303d4e50f7b621016f199b1b28c"' :
                                            'id="xs-controllers-links-module-AuthModule-899fbb94611b579d9d0df5eaf1861004614cd8251cf0dc1b31b0f6ff961d07664fd9e8dc1f310a4ce0c00aec117bdc22acba6303d4e50f7b621016f199b1b28c"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-899fbb94611b579d9d0df5eaf1861004614cd8251cf0dc1b31b0f6ff961d07664fd9e8dc1f310a4ce0c00aec117bdc22acba6303d4e50f7b621016f199b1b28c"' : 'data-target="#xs-injectables-links-module-AuthModule-899fbb94611b579d9d0df5eaf1861004614cd8251cf0dc1b31b0f6ff961d07664fd9e8dc1f310a4ce0c00aec117bdc22acba6303d4e50f7b621016f199b1b28c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-899fbb94611b579d9d0df5eaf1861004614cd8251cf0dc1b31b0f6ff961d07664fd9e8dc1f310a4ce0c00aec117bdc22acba6303d4e50f7b621016f199b1b28c"' :
                                        'id="xs-injectables-links-module-AuthModule-899fbb94611b579d9d0df5eaf1861004614cd8251cf0dc1b31b0f6ff961d07664fd9e8dc1f310a4ce0c00aec117bdc22acba6303d4e50f7b621016f199b1b28c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HearthstoneModule.html" data-type="entity-link" >HearthstoneModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-HearthstoneModule-a7a3ee7406857310425251605cf799a40ae68c3a7f3510f1572d2b522512ecfbd86ff7c671077618ad4002abbddb69994cf05b93183da52f08b7dc50d2d29c73"' : 'data-target="#xs-controllers-links-module-HearthstoneModule-a7a3ee7406857310425251605cf799a40ae68c3a7f3510f1572d2b522512ecfbd86ff7c671077618ad4002abbddb69994cf05b93183da52f08b7dc50d2d29c73"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HearthstoneModule-a7a3ee7406857310425251605cf799a40ae68c3a7f3510f1572d2b522512ecfbd86ff7c671077618ad4002abbddb69994cf05b93183da52f08b7dc50d2d29c73"' :
                                            'id="xs-controllers-links-module-HearthstoneModule-a7a3ee7406857310425251605cf799a40ae68c3a7f3510f1572d2b522512ecfbd86ff7c671077618ad4002abbddb69994cf05b93183da52f08b7dc50d2d29c73"' }>
                                            <li class="link">
                                                <a href="controllers/HearthstoneController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HearthstoneController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HearthstoneModule-a7a3ee7406857310425251605cf799a40ae68c3a7f3510f1572d2b522512ecfbd86ff7c671077618ad4002abbddb69994cf05b93183da52f08b7dc50d2d29c73"' : 'data-target="#xs-injectables-links-module-HearthstoneModule-a7a3ee7406857310425251605cf799a40ae68c3a7f3510f1572d2b522512ecfbd86ff7c671077618ad4002abbddb69994cf05b93183da52f08b7dc50d2d29c73"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HearthstoneModule-a7a3ee7406857310425251605cf799a40ae68c3a7f3510f1572d2b522512ecfbd86ff7c671077618ad4002abbddb69994cf05b93183da52f08b7dc50d2d29c73"' :
                                        'id="xs-injectables-links-module-HearthstoneModule-a7a3ee7406857310425251605cf799a40ae68c3a7f3510f1572d2b522512ecfbd86ff7c671077618ad4002abbddb69994cf05b93183da52f08b7dc50d2d29c73"' }>
                                        <li class="link">
                                            <a href="injectables/HearthstoneService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HearthstoneService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MailModule-68687c8934e9b0431e1c6f66e859627418a283e0d2a4e614443899135c3fa34883a127c5933e0f234924d438c75274b9f6eba58b2c6b43e60d1fcb27a0706c0d"' : 'data-target="#xs-injectables-links-module-MailModule-68687c8934e9b0431e1c6f66e859627418a283e0d2a4e614443899135c3fa34883a127c5933e0f234924d438c75274b9f6eba58b2c6b43e60d1fcb27a0706c0d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-68687c8934e9b0431e1c6f66e859627418a283e0d2a4e614443899135c3fa34883a127c5933e0f234924d438c75274b9f6eba58b2c6b43e60d1fcb27a0706c0d"' :
                                        'id="xs-injectables-links-module-MailModule-68687c8934e9b0431e1c6f66e859627418a283e0d2a4e614443899135c3fa34883a127c5933e0f234924d438c75274b9f6eba58b2c6b43e60d1fcb27a0706c0d"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-f54402557caa462ed9f29f80c8ed6cc3ede05a7a610349e8e14710cd1a1cc611333b3fcb294b845ea188de594f52663ad0853ce80e3211d2bd3f0b5138c34d77"' : 'data-target="#xs-controllers-links-module-UserModule-f54402557caa462ed9f29f80c8ed6cc3ede05a7a610349e8e14710cd1a1cc611333b3fcb294b845ea188de594f52663ad0853ce80e3211d2bd3f0b5138c34d77"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-f54402557caa462ed9f29f80c8ed6cc3ede05a7a610349e8e14710cd1a1cc611333b3fcb294b845ea188de594f52663ad0853ce80e3211d2bd3f0b5138c34d77"' :
                                            'id="xs-controllers-links-module-UserModule-f54402557caa462ed9f29f80c8ed6cc3ede05a7a610349e8e14710cd1a1cc611333b3fcb294b845ea188de594f52663ad0853ce80e3211d2bd3f0b5138c34d77"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-f54402557caa462ed9f29f80c8ed6cc3ede05a7a610349e8e14710cd1a1cc611333b3fcb294b845ea188de594f52663ad0853ce80e3211d2bd3f0b5138c34d77"' : 'data-target="#xs-injectables-links-module-UserModule-f54402557caa462ed9f29f80c8ed6cc3ede05a7a610349e8e14710cd1a1cc611333b3fcb294b845ea188de594f52663ad0853ce80e3211d2bd3f0b5138c34d77"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-f54402557caa462ed9f29f80c8ed6cc3ede05a7a610349e8e14710cd1a1cc611333b3fcb294b845ea188de594f52663ad0853ce80e3211d2bd3f0b5138c34d77"' :
                                        'id="xs-injectables-links-module-UserModule-f54402557caa462ed9f29f80c8ed6cc3ede05a7a610349e8e14710cd1a1cc611333b3fcb294b845ea188de594f52663ad0853ce80e3211d2bd3f0b5138c34d77"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CsrfMiddleware.html" data-type="entity-link" >CsrfMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CardDto.html" data-type="entity-link" >CardDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeckDto.html" data-type="entity-link" >DeckDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});