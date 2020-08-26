<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Calculator</title>
    <link rel="icon" href="calc-favicon.png" type="image/gif" sizes="16x16">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <main>
        <div class="container">
            <div class="title">
                <p class="blink_me">PHP CALCULATOR</p>
            </div>
            <div class="calculator">
                <form name="php-calc-form" class="php-calc-form" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST">
                    <input type="number" name="num1" id="num1" placeholder="Enter Number">
                    <input type="number" name="num2" id="num2" placeholder="Enter Number">
                    <select name="operation" id="operation">
                        <option value="add">ADD</option>
                        <option value="sub">SUB</option>
                        <option value="mul">MULT</option>
                        <option value="div">DIV</option>
                    </select>
                    <button type="submit" name="calc-submit">SUBMIT</button>
                </form>
            </div>
        </div>
        <div class="display">
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
                                            echo "<span class='type'>ADDITION</span> <p>{$num1} + {$num2} = {$sum}</p>";
                                            break;

                                case "sub": $sub = $num1 - $num2;
                                            echo "<span class='type'>SUBTRACTION</span> <p>{$num1} - {$num2} = {$sub}</p>";
                                            break;

                                case "mul": $mul = $num1 * $num2;
                                            echo "<span class='type'>MULTIPLICATION</span> <p>{$num1} x {$num2} = {$mul}</p>";
                                            break;

                                case "div": $div = $num1 / $num2;
                                            echo "<span class='type'>DIVISION</span> <p>{$num1} / {$num2} = {$div}</p>";
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
        </div>
    </main>
</body>
</html>