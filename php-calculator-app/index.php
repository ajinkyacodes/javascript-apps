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
            <form name="php-calc-form" action="calc-operations.php">
                <input type="text" name="firstno">
                <input type="text" name="secondno">
                <select name="operations" id="operations">
                    <option value="add">ADD</option>
                    <option value="add">SUB</option>
                    <option value="add">MULT</option>
                    <option value="add">DIV</option>                    
                </select>
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    </div>
</body>
</html>