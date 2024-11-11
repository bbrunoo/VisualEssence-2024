import pandas as pd

from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)
@app.route('/excell', methods=['POST'])
def receber_pergunta():
    data = request.json 
    nome_arquivo = data.get('arquivo') 
    resposta = processar_excell(nome_arquivo)
    return jsonify({'resposta': resposta})

def processar_excell(nome_arquivo):
    # Obtém o diretório atual do script
    diretorio_atual = os.path.dirname(os.path.abspath(__file__))
    
    # Constrói o caminho completo do arquivo
    caminho_arquivo = os.path.join(diretorio_atual, nome_arquivo)
    
    df = pd.read_excel(caminho_arquivo)

    # Lista para armazenar os resultados JSON
    json_resultados = []

    # Percorre cada linha do DataFrame
    for _, row in df.iterrows():
        # Cria um dicionário para a linha atual
        json_obj = row.to_dict()
        json_resultados.append(json_obj)

    return json_resultados

if __name__ == '__main__':
    app.run(debug=True, port=8080)
