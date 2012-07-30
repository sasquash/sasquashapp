<?php

$uploads_dir = '/uploads';
foreach ($_FILES["photo"]["error"] as $key => $error) {
    if ($error == UPLOAD_ERR_OK) {
        $tmp_name = $_FILES["photo"]["tmp_name"][$key];
        $name = $_FILES["photo"]["name"][$key];
        move_uploaded_file($tmp_name, "$uploads_dir/$name");
    }
}

?>

<?php// Directory where uploaded images are saved
$dirname = "/uploads";
 // If uploading file
if ($_FILES) {    print_r($_FILES);    mkdir ($dirname, 0777, true);    
 move_uploaded_file($_FILES["file"]["tmp_name"],$dirname."/".$_FILES["file"]["name"]);
}?>