from flask import Flask, request, jsonify
import requests

api_key = 'secret-key'

app = Flask(__name__)

@app.route('/pergunta', methods=['POST'])
def receber_pergunta():
    data = request.json 
    pergunta = data.get('pergunta') 
    resposta = processar_pergunta(pergunta) 
    return jsonify({'resposta': resposta})

def processar_pergunta(pergunta):
    url = 'https://api.openai.com/v1/chat/completions'

    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json',
    }

    data = {
        'model': 'gpt-4',
        'messages': [
            {'role': 'user', 'content': f'{pergunta}'}
        ]
    }

    response = requests.post(url, headers=headers, json=data)
    
    print(response.text) 
    
    if response.status_code == 200:
        resposta = response.json()
        print(resposta['choices'][0]['message']['content'])
        return resposta['choices'][0]['message']['content']
    else:
        print(f'Erro: {response.status_code}, {response.text}')
   
    
if __name__ == '__main__':
    app.run(debug=True, port=8080)
