from flask import Flask, render_template, redirect, url_for


app = Flask(__name__)

app.config["SECRET_KEY"] = "my_secret"
app.config["WTF_CSRF_ENABLED"] = False

@app.route('/')
def home1():
    return render_template('home.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/oefenen')
def oefenen():
    return render_template('oefeningen.html')

@app.route('/hoofdstukken/<naam>')
def hoofdstukken(naam):
    return render_template(f"Hoofdstukken/{naam}.html")

@app.route('/redirect_home')
def redirect_home():
    return redirect(url_for('home'))

@app.route('/hulp')
def hulp():
    return render_template('hulp.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)