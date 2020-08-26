<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Calculator</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="title">
            <p>PHP CALCULATOR</p>
        </div>
        <div class="calculator">
            <form name="php-calc-form" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST">
                <input type="number" name="num1" id="num1">
                <input type="number" name="num2" id="num2">
                <select name="operation" id="operation">
                    <option value="add">ADD</option>
                    <option value="sub">SUB</option>
                    <option value="mul">MULT</option>
                    <option value="div">DIV</option>
                </select>
                <button type="submit" name="calc-submit">SUBMIT</button>
            </form>
        </div>
        <div class="display">
            <p>
            <?php
                // define variables and set to empty values
                $num1 = $num2 = "";

                if($_SERVER['REQUEST_METHOD'] == 'POST') {
                    if(isset($_POST['calc-submit'])){                   
                        $num1 = test_input($_POST["num1"]);
                        $num2 = test_input($_POST["num2"]);

                        if((isset($num1)&&!empty($num1))&&(isset($num2)&&!empty($num2))) {
                            $operation = $_POST['operation'];

                            switch($operation) {
                                case "add": $sum = $num1 + $num2;
                                            echo "The addition of two numbers is {$sum}";
                                            break;

                                case "sub": $sub = $num1 - $num2;
                                            echo "The subtraction of two numbers is {$sub}";
                                            break;

                                case "mul": $mul = $num1 * $num2;
                                            echo "The multiplication of two numbers is {$mul}";
                                            break;

                                case "div": $div = $num1 / $num2;
                                            echo "The division of two numbers is {$div}";
                                            break;

                                default: echo "Sorry. It doesn't exist.";
                            }
                        }
                    }
                }
                function test_input($data) {
                    $data = trim($data);
                    $data = stripslashes($data);
                    $data = htmlspecialchars($data);
                    return $data;
                }
            ?>
            </p>
        </div>
    </div>
</body>
</html>