from bs4 import BeautifulSoup
 
import requests

import re
 
def findnonempty(entry):
    result = entry
    if result:
        return result.get_text()
    else:
        return "" 
 
def use_url(number, link, textfile):
    try:
        a_req = requests.get(link)
    except KeyError:
        print "improper link"
        return
    
    number = str(number)
    new_data = a_req.text
    some_soup = BeautifulSoup(new_data)
    
    the_div = some_soup.find("li", {"id" : "cp_street"})
    address = findnonempty(the_div)
    street, colon, main = address.partition(':')
    
    title = some_soup.find("title")
    name = findnonempty(title)
    
    
    #print (main + "\n")
    textfile.write('{ "address":' + '"%s"' %main.encode('utf-8').translate(None, ','))
    textfile.write(",")
    textfile.write('"name":' + '"%s"' %name.encode('utf-8').translate(None, ','))
    textfile.write(' },')
    textfile.write("\n")
 
 
def execute(url): 
    r  = requests.get("http://" +url)
 
    data = r.text
 
    soup = BeautifulSoup(data)


#for a in soup.find_all(re.compile("class")):
 #   for link in a.find_all('a'):
 #       print(link.get('href'))
        
    mydivs = soup.findAll("div", { "class" : "post-left" })
    
    count = 1


    for div in mydivs:
        for link in div.find_all('a'):
            actual_link = link.get('href')
            #print(actual_link)
            use_url(count, actual_link, every)
            count = count + 1
        
        
        
    
every = open("json-sublets.json", "w")
every.write("{" + "\n" + '"sublets" : [' + "\n")    
execute("www.pennlets.com")
for number in range(6):
    execute("www.pennlets.com/ads/page/%s/" %str(number + 2))
    
every.write("]" + "\n" + "}")
every.close()





