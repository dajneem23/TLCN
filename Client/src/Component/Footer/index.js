import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import './fonts/icomoon/style.css'



function index() {
    return (
        <div>
            <footer class="footer-16371">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-9 text-center">
                            <div class="footer-site-logo mb-4">
                                <a href="#">IT-Link</a>
                            </div>
                            <ul class="list-unstyled nav-links mb-5">
                                <li><a href="#">About</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">Press</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Legal</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>

                            <div class="social mb-4">
                                <h3>Stay in touch</h3>
                                <ul class="list-unstyled">
                                    <li class="in"><a href="#"><span class="icon-instagram"></span></a></li>
                                    <li class="fb"><a href="#"><span class="icon-facebook"></span></a></li>
                                    <li class="tw"><a href="#"><span class="icon-twitter"></span></a></li>
                                    <li class="pin"><a href="#"><span class="icon-pinterest"></span></a></li>
                                    <li class="dr"><a href="#"><span class="icon-dribbble"></span></a></li>
                                </ul>
                            </div>

                            <div class="copyright">
                                <p class="mb-0"><small>&copy; Colorlib. All Rights Reserved.</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default index;

