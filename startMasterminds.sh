function main () {
  local chances=0
  local result='false'

  while [[ $chances -lt 6 && $result == 'false' ]]
  do
    chances=$(($chances + 1))
    read -p "Enter the code : " code
    result=$(node masterminds.js $code)
    node mastermindsHtmlGenerator.js
    open masterminds.html
  done

  local message='You lose'
  if [[ 'true' == "$result" ]]
  then
    message='You won'
  fi
  echo $message
}

echo [] > './masterminds.json'
main
