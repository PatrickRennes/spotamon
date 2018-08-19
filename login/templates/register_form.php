<center><div class="form">
<h1>Registration</h1>
    <form name="registration" action="" method="post">
        <p><input type="text" name="uname" placeholder="Username" required /></p>
        <p><input type="email" name="email" placeholder="Email" required /></p>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <input type="password" minlength="6" name="password" id="password" placeholder="password" onkeydown="" onkeyup=""/><br><br>
        <input type="password" minlength="6" name="confirm_password" id="confirm_password" placeholder="confirm password" onkeydown="" onkeyup="" />
        <br><span id='message'></span>
        <div id="error-nwl"></div>
        <br><a href="../policy.php">Read our privacy policy</a>
        <p>I've read the privacy policy and agree to share my personal information</p>
        <p>By registering an account I agree with the privacy policy</p>
        <input type="submit" name="submit"  value="registration"  id="submit" disabled/>
        <script src='./js/register_form.js'></script>
    </form>
<br />
<p>Already registered? <a href='login.php'>Login Here</a></p>
<br />
<p>Back to <a href='../'>home</a></p>
</div></center>
