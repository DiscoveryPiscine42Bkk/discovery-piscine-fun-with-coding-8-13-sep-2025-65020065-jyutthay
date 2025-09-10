i=0
for arg in "$@"; do
    echo "$arg"
    ((i++))
    if [ $i -eq 3 ]; then
        break
    fi
done