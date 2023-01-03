PACKAGE_VERSION=$(
cat package.json |
grep \\\"version\\\" |     # filter lines with "version" in them
head -1 |                  # take first line
awk -F: '{ print $2 }' |   # split string by ":", take second part
sed 's/[\",]//g' |         # remove , and "
tr -d '[[:space:]]'        # remove any leftover spaces and new lines
)

git tag v$PACKAGE_VERSION
git push --tags