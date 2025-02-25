# Sistema de Gerenciamento de Tarefas
Este projeto implementa um sistema de gerenciamento de tarefas com interface web e servidor Node.js, demonstrando o uso de eventos e APIs REST.

## Estrutura das Tarefas

```javascript
{
  id: number,           // Identificador único
  descricao: string,    // Descrição da tarefa
  status: string        // 'aguardando' | 'trabalhando' | 'finalizado'
}
```

## Estrutura do Projeto

```
/node
├── index.js                # Servidor principal com API REST e eventos
├── index.html             # Interface web para gerenciamento de tarefas
├── Execícios
│   └── taskProcessor.js   # Processador automático de tarefas com eventos
```

## Descrição dos Arquivos
### Execício: Processador Automático (taskProcessor.js)
Sistema que processa tarefas automaticamente:
- Executa ciclos a cada 5 segundos
- Gerencia estados das tarefas (aguardando, trabalhando, finalizada)
- Emite eventos para cada mudança de estado

### API REST e Servidor (index.js)
Implementa um servidor HTTP com endpoints REST para:
- Listar todas as tarefas (GET /tasks)
- Criar nova tarefa (POST /tasks)
- Atualizar status (PATCH /tasks/:id/status)
- Finalizar tarefa (PATCH /tasks/:id/finish)

Eventos emitidos:
- `criacao`: Quando uma nova tarefa é criada
- `finalizacao`: Quando uma tarefa é finalizada
- `consultado`: Quando a lista de tarefas é consultada
- `status-alterado`: Quando o status de uma tarefa é modificado

### Interface Web (index.html)
Fornece uma interface amigável para:
- Visualizar todas as tarefas
- Adicionar novas tarefas
- Atualizar status das tarefas
- Finalizar tarefas

# Exercício: Sistema de Monitoramento de Servidores com Events
## Objetivo
Desenvolver um sistema de monitoramento que simule a coleta de temperatura de servidores em um data center, utilizando EventEmitter para notificações e alertas.

## Descrição do Exercício
Criar um programa que monitore múltiplos servidores. Cada servidor possui:

- **ID:** Identificador único do servidor
- **Nome:** Nome do servidor
- **Temperatura:** Valor atual em Celsius
- **Status:** Um dos estados:
  - `"normal"`: Temperatura <= 45°C
  - `"atenção"`: Temperatura > 45°C e <= 55°C
  - `"crítico"`: Temperatura > 55°C
  - `"offline"`: Servidor não responde

### Funcionalidades Requeridas
1. **Simulação de Temperatura:**
   - A cada 3 segundos, simular uma nova leitura de temperatura
   - Temperatura base: 40°C + variação aleatória de -5 a +20
   - 10% de chance do servidor ficar offline a cada leitura

2. **Sistema de Alertas:**
   - Emitir eventos específicos para cada mudança de status
   - Registrar timestamp de início/fim de cada estado crítico
   - Manter histórico das últimas 5 leituras de cada servidor

3. **Monitoramento de Performance:**
   - Calcular média móvel de temperatura (últimas 5 leituras)
   - Detectar tendências de aquecimento (3 aumentos consecutivos)
   - Emitir alerta preventivo quando detectar tendência

### Eventos Obrigatórios
- `temperature-update`: Nova leitura de temperatura
- `status-change`: Mudança de status do servidor
- `server-offline`: Servidor ficou offline
- `server-recovered`: Servidor voltou a responder
- `critical-alert`: Temperatura atingiu nível crítico
- `trend-detected`: Detectada tendência de aquecimento

## Estrutura Sugerida

```javascript
const server = {
  id: 1,
  name: "API-Server-01",
  temperature: 40,
  status: "normal",
  history: [],           //últimas 5 leituras
  criticalSince: null,   //timestamp início do estado crítico
  lastUpdate: Date.now() //última atualização
}
```

## Dicas de Implementação
### 1. Geração de Temperaturas
```javascript
function generateTemperature() {
  const base = 40;
  const variation = Math.random() * 25 - 5; //-5 a +20
  return +(base + variation).toFixed(1);
}
```

### 2. Cálculo de Média Móvel
```javascript
const calculateAverage = history => {
  return history.reduce((sum, reading) => sum + reading, 0) / history.length;
}
```

### 3. Detecção de Tendência
```javascript
//Retorna true se últimas 3 leituras são crescentes
const isTemperatureIncreasing = history => {
  if (history.length < 3) return false;
  const last3 = history.slice(-3);
  return last3[0] < last3[1] && last3[1] < last3[2];
}
```

## Desafios Extras (Opcional)
1. **Zonas de Servidores:**
   - Agrupar servidores em zonas
   - Alertar quando uma zona inteira está em estado crítico

2. **Persistência:**
   - Salvar histórico em arquivo JSON
   - Carregar estado anterior ao iniciar

## Exemplo de Saída Console
```
[2024-01-20 14:30:15] API-Server-01: 43.2°C (normal)
[2024-01-20 14:30:18] API-Server-01: 48.7°C (atenção) 
[2024-01-20 14:30:21] API-Server-01: 52.1°C (atenção) [Tendência: ↑]
[2024-01-20 14:30:24] API-Server-01: OFFLINE
[2024-01-20 14:30:27] API-Server-01: 41.2°C (normal)
```
## Como Avaliar Sua Solução
- [ ] Todos os eventos são emitidos corretamente?
- [ ] Sistema detecta e registra tendências?
- [ ] Histórico mantém apenas últimas 5 leituras?
- [ ] Timestamps são registrados corretamente?
- [ ] Sistema recupera apropriadamente de estado offline?