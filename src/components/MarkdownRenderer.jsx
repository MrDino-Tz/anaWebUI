import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const KEYWORDS = {
  python: {
    keyword: /\b(?:def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|raise|with|pass|break|continue|and|or|not|in|is|lambda|yield|async|await|del|global|nonlocal|assert|True|False|None)\b/g,
    builtin: /\b(?:print|len|range|int|str|float|list|dict|set|tuple|type|open|input|map|filter|zip|enumerate|sorted|reversed|abs|sum|min|max|any|all|isinstance|hasattr|getattr|setattr|super|self|__init__|__str__|__repr__|__call__|__new__|__del__|__add__|__len__|__getitem__|__setitem__)\b/g,
    decorator: /@\w+/g,
    comment: /#.*$/gm,
    string: /""".*?"""|'''.*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?[jJ]?\b/g,
    function: /\b([a-zA-Z_]\w*)\s*\(/g,
    operator: /[+\-*/%=<>!&|^~]+/g,
    punctuation: /[{}()\[\];,:.]/g,
    fstring: /\bf(['"])(?:[^\1\\]|\\.)*\1/g,
  },
  javascript: {
    keyword: /\b(?:function|const|let|var|if|else|for|while|do|return|import|export|default|from|class|extends|new|this|super|async|await|yield|try|catch|finally|throw|switch|case|break|continue|typeof|instanceof|of|in|true|false|null|undefined)\b/g,
    constant: /\b(?:null|undefined|true|false|NaN|Infinity|undefined)\b/g,
    comment: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    string: /`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g,
    function: /\b([a-zA-Z_$]\w*)\s*\(/g,
    method: /\.\s*([a-zA-Z_$]\w*)\s*\(/g,
    operator: /[+\-*/%=<>!&|^~?:]+/g,
    punctuation: /[{}()\[\];,:.]/g,
    property: /\.\s*([a-zA-Z_$]\w*)\b(?!\s*\()/g,
    regexp: /\/(?:[^\/\\]|\\.)*\/[gimsuy]*/g,
    template: /\$\{[^}]+\}/g,
  },
  typescript: {
    keyword: /\b(?:function|const|let|var|if|else|for|while|do|return|import|export|default|from|class|extends|implements|interface|type|enum|new|this|super|async|await|yield|try|catch|finally|throw|switch|case|break|continue|typeof|instanceof|of|in|true|false|null|undefined|abstract|private|protected|public|readonly|static|as|any|never|void|unknown|satisfies)\b/g,
    constant: /\b(?:null|undefined|true|false|NaN|Infinity)\b/g,
    comment: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    string: /`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g,
    function: /\b([a-zA-Z_$]\w*)\s*\(/g,
    method: /\.\s*([a-zA-Z_$]\w*)\s*\(/g,
    operator: /[+\-*/%=<>!&|^~?:]+/g,
    punctuation: /[{}()\[\];,:.]/g,
    type: /\b(?:string|number|boolean|object|Array|Record|Partial|Required|Pick|Omit|Promise|Map|Set|React\.\w+|JSX\.\w+|HTML\w+|SVG\w+|CSS\w+)\b/g,
    regexp: /\/(?:[^\/\\]|\\.)*\/[gimsuy]*/g,
    template: /\$\{[^}]+\}/g,
  },
  jsx: {
    keyword: /\b(?:function|const|let|var|if|else|for|while|do|return|import|export|default|from|class|extends|new|this|super|async|await|yield|try|catch|finally|throw|switch|case|break|continue|typeof|instanceof|of|in|true|false|null|undefined)\b/g,
    tag: /<\/?[A-Z]\w*[\s\S]*?\/?>/g,
    comment: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    string: /`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g,
    function: /\b([a-zA-Z_$]\w*)\s*\(/g,
    operator: /[+\-*/%=<>!&|^~?:]+/g,
    punctuation: /[{}()\[\];,:.]/g,
    template: /\$\{[^}]+\}/g,
  },
  bash: {
    comment: /#.*$/gm,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/gs,
    function: /\b(\w+)\s*\(\)/g,
    keyword: /\b(?:if|then|else|elif|fi|for|while|do|done|case|esac|function|return|exit|export|source|local|echo|read|set|unset|trap|exec|eval|cd|ls|rm|mv|cp|mkdir|chmod|chown|grep|sed|awk|cat|find|sudo|apt|yum|pip|npm|docker|git)\b/g,
    variable: /\$[a-zA-Z_]\w*|\$\{[\w*@#?$!_-]+\}/g,
    operator: /[=<>!]+/g,
    number: /\b\d+\b/g,
  },
  json: {
    key: /"([^"]+)"\s*:/g,
    string: /"(?:[^"\\]|\\.)*"/g,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g,
    boolean: /\btrue\b|\bfalse\b/g,
    null: /\bnull\b/g,
  },
  html: {
    tag: /<\/?[\w-]+[\s\S]*?>/g,
    doctype: /<!DOCTYPE[\s\S]*?>/gi,
    comment: /<!--[\s\S]*?-->/g,
    attr: /\b(class|id|style|src|href|alt|title|type|name|value|placeholder|onclick|onchange|onsubmit|onload|onerror|data-\w+|aria-\w+|role|rel|target|for|action|method|media|width|height|lang|dir)\s*=/g,
    entity: /&[\w#]+;/g,
  },
  css: {
    property: /[\w-]+(?=\s*:)/g,
    value: /:\s*([^;{]+)/g,
    class: /\.[\w-]+/g,
    id: /#[\w-]+/g,
    pseudo: /::?[\w-]+/g,
    atrule: /@\w+/g,
    comment: /\/\*[\s\S]*?\*\//g,
    number: /\b\d+\.?\d*(?:px|em|rem|%|vh|vw|vmin|vmax|s|ms|deg|rad|fr|ch|ex|cm|mm|in|pt|pc)?\b/g,
    color: /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\s*\(/g,
    unit: /\b(?:px|em|rem|%|vh|vw|vmin|vmax|s|ms|deg|rad|fr|ch|ex)\b/g,
  },
  cpp: {
    keyword: /\b(?:int|float|double|char|void|bool|auto|const|static|extern|virtual|override|final|public|private|protected|class|struct|enum|union|namespace|using|template|typename|include|define|ifdef|ifndef|endif|if|else|for|while|do|return|break|continue|switch|case|default|new|delete|try|catch|throw|noexcept|true|false|nullptr|this|friend|explicit|mutable|volatile|register|signed|unsigned|short|long|size_t|string|vector|map|set|list|cout|cin|endl|std|printf|scanf|malloc|calloc|realloc|free|sizeof|typedef|constexpr|const_cast|static_cast|dynamic_cast|reinterpret_cast)\b/g,
    comment: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/gs,
    number: /\b\d+\.?\d*(?:f|l|ll|u|ull|UL)?\b/g,
    function: /\b([a-zA-Z_]\w*)\s*\(/g,
    preprocessor: /#\s*\w+/g,
    operator: /[+\-*/%=<>!&|^~?:]+|::|->/g,
    punctuation: /[{}()\[\];,:.]/g,
  },
  java: {
    keyword: /\b(?:public|private|protected|static|final|class|interface|enum|extends|implements|abstract|synchronized|volatile|transient|native|strictfp|if|else|for|while|do|switch|case|default|break|continue|return|new|this|super|try|catch|finally|throw|throws|import|package|true|false|null|void|int|long|float|double|char|byte|short|boolean|String|var|record|sealed|permits|instanceof|module|requires|exports|opens|provides|to|with|yield)\b/g,
    comment: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|""".*?"""/gs,
    number: /\b\d+\.?\d*(?:f|d|l|L)?\b/g,
    function: /\b([a-zA-Z_]\w*)\s*\(/g,
    annotation: /@\w+/g,
    operator: /[+\-*/%=<>!&|^~?:]+/g,
    punctuation: /[{}()\[\];,:.]/g,
  },
  rust: {
    keyword: /\b(?:fn|let|mut|const|static|if|else|for|while|loop|match|return|break|continue|struct|enum|trait|impl|pub|use|mod|crate|self|super|async|await|move|ref|where|type|dyn|in|as|true|false|Some|None|Ok|Err|unsafe|extern|macro_rules|abstract|become|box|do|final|override|priv|try|typeof|unsized|virtual|yield)\b/g,
    comment: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|r#?"(?:[^"]*)"#?/gs,
    number: /\b\d+\.?\d*(?:f32|f64|u8|u16|u32|u64|i8|i16|i32|i64|usize|isize)?\b/g,
    function: /\b([a-zA-Z_]\w*)\s*\(/g,
    macro: /\w+!/g,
    lifetime: /'[a-zA-Z_]\w*/g,
    operator: /[+\-*/%=<>!&|^~?:]+|::|->/g,
    punctuation: /[{}()\[\];,:.]/g,
    attribute: /#!?\[.*?\]/g,
  },
  go: {
    keyword: /\b(?:func|package|import|return|if|else|for|range|switch|case|default|break|continue|go|defer|select|chan|map|struct|interface|type|var|const|true|false|nil|fallthrough|goto)\b/g,
    comment: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    string: /"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g,
    function: /\b([a-zA-Z_]\w*)\s*\(/g,
    operator: /[+\-*/%=<>!&|^~?:]+|:=/g,
    punctuation: /[{}()\[\];,:.]/g,
  },
  yaml: {
    key: /^\s*[\w-]+\s*(?=:)/gm,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g,
    boolean: /\b(?:true|false|yes|no|on|off)\b/g,
    comment: /#.*$/gm,
    anchor: /[&*][\w-]+/g,
  },
  sql: {
    keyword: /\b(?:SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|INDEX|JOIN|LEFT|RIGHT|INNER|OUTER|CROSS|FULL|NATURAL|ON|AND|OR|NOT|IN|LIKE|BETWEEN|IS|NULL|AS|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|UNION|ALL|DISTINCT|CASE|WHEN|THEN|ELSE|END|EXISTS|PRIMARY|KEY|FOREIGN|REFERENCES|CASCADE|BEGIN|COMMIT|ROLLBACK|GRANT|REVOKE|TRIGGER|PROCEDURE|FUNCTION|VIEW|WITH|RECURSIVE|EXPLAIN|ANALYZE|DESCRIBE)\b/g,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/gs,
    number: /\b\d+\.?\d*\b/g,
    comment: /--.*$/gm,
    operator: /[=<>!]+/g,
    function: /\b(?:COUNT|SUM|AVG|MIN|MAX|COALESCE|NULLIF|CAST|CONVERT|UPPER|LOWER|TRIM|LENGTH|SUBSTRING|REPLACE|CONCAT|NOW|DATE|YEAR|MONTH|DAY|EXTRACT|ROW_NUMBER|RANK|DENSE_RANK|LEAD|LAG|FIRST_VALUE|LAST_VALUE)\s*\(/gi,
  },
  ruby: {
    keyword: /\b(?:def|class|module|if|elsif|else|unless|while|until|for|in|do|end|return|yield|next|break|redo|retry|begin|rescue|ensure|raise|throw|catch|case|when|then|and|or|not|true|false|nil|self|super|defined\?|require|include|extend|prepend|alias|undef|private|protected|public|attr_reader|attr_writer|attr_accessor|module_function)\b/g,
    comment: /#.*$/gm,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|%(?:q|Q|r|w|W|x)?\s*\{[^}]*\}|%(?:q|Q|r|w|W|x)?\s*\([^)]*\)/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g,
    function: /\b([a-zA-Z_]\w*)\s*\(/g,
    symbol: /:\w+/g,
    regexp: /\/[^\/\\]\//g,
    operator: /[+\-*/%=<>!&|^~?:]+/g,
    punctuation: /[{}()\[\];,:.]/g,
  },
  php: {
    keyword: /\b(?:function|class|interface|trait|enum|extends|implements|abstract|final|readonly|public|private|protected|static|const|var|if|else|elseif|for|foreach|while|do|switch|case|break|continue|return|require|require_once|include|include_once|new|clone|instanceof|true|false|null|void|int|float|string|bool|array|object|mixed|never|self|parent|throw|try|catch|finally|match|fn|declare|strict_types|namespace|use|as|yield|finally|global|echo|print|isset|unset|empty|die|exit|list)\b/g,
    comment: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/gs,
    number: /\b\d+\.?\d*\b/g,
    function: /\b([a-zA-Z_]\w*)\s*\(/g,
    variable: /\$\w+/g,
    operator: /[+\-*/%=<>!&|^~?:]+|->|=>/g,
    punctuation: /[{}()\[\];,:.]/g,
  },
  swift: {
    keyword: /\b(?:func|class|struct|enum|protocol|extension|var|let|if|else|for|while|repeat|switch|case|default|break|continue|return|guard|defer|throw|throws|rethrows|catch|do|try|await|async|in|as|is|where|true|false|nil|self|super|init|deinit|lazy|weak|unowned|mutating|nonmutating|static|class|override|final|required|optional|open|public|internal|fileprivate|private|import|typealias|associatedtype|subscript|indirect|some|any|actor|nonisolated|isolated|distributed|macro)\b/g,
    comment: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    string: /"(?:[^"\\]|\\.)*"|""".*?"""/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g,
    function: /\b([a-zA-Z_]\w*)\s*\(/g,
    operator: /[+\-*/%=<>!&|^~?:]+|->/g,
    punctuation: /[{}()\[\];,:.]/g,
  },
  kotlin: {
    keyword: /\b(?:fun|class|object|data|sealed|enum|interface|abstract|open|override|final|var|val|if|else|when|for|while|do|return|break|continue|try|catch|finally|throw|true|false|null|this|super|init|companion|inline|value|typealias|constructor|by|delegation|as|is|in|out|where|suspend|internal|private|protected|public|import|package|lateinit|lazy|operator|infix|tailrec|crossinline|noinline|reified|annotation|annotation class|inner|expect|actual|sealed)\b/g,
    comment: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    string: /"(?:[^"\\]|\\.)*"|""".*?"""/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?[fFL]?\b/g,
    function: /\b([a-zA-Z_]\w*)\s*\(/g,
    annotation: /@\w+/g,
    operator: /[+\-*/%=<>!&|^~?:]+|->|::/g,
    punctuation: /[{}()\[\];,:.]/g,
  },
  dart: {
    keyword: /\b(?:class|enum|extends|implements|with|mixin|abstract|base|sealed|final|interface|override|covariant|typedef|var|final|const|late|required|if|else|for|while|do|switch|case|default|break|continue|return|try|catch|finally|throw|rethrow|true|false|null|this|super|new|is|as|in|import|export|library|part|of|show|hide|async|await|yield|sync|generator|static|factory|get|set|void|int|double|num|String|bool|List|Set|Map|Object|dynamic|Never|Record|function|assert|augment|extension|on|call)\b/g,
    comment: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|""".*?"""|'''.*?'''/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g,
    function: /\b([a-zA-Z_]\w*)\s*\(/g,
    annotation: /@\w+/g,
    operator: /[+\-*/%=<>!&|^~?:]+|->|\.\.|\.\.\./g,
    punctuation: /[{}()\[\];,:.]/g,
  },
  lua: {
    keyword: /\b(?:function|if|then|else|elseif|end|for|while|do|repeat|until|return|break|local|nil|true|false|and|or|not|in|goto|require|module|package|rawget|rawset|setmetatable|getmetatable|pairs|ipairs|next|tonumber|tostring|type|unpack|select|xpcall|pcall|error|assert|collectgarbage|coroutine|string|table|math|io|os|debug)\b/g,
    comment: /--.*$|--\[\[[\s\S]*?\]\]--/gm,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\[\[[\s\S]*?\]\]/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g,
    function: /\b([a-zA-Z_]\w*)\s*\(/g,
    operator: /[+\-*/%=<>!&|^~?:]+/g,
    punctuation: /[{}()\[\];,:.]/g,
  },
  dockerfile: {
    keyword: /\b(?:FROM|RUN|CMD|ENTRYPOINT|COPY|ADD|WORKDIR|ENV|ARG|EXPOSE|VOLUME|LABEL|MAINTAINER|USER|SHELL|HEALTHCHECK|ONBUILD|STOPSIGNAL)\b/g,
    comment: /#.*$/gm,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/gs,
  },
  makefile: {
    target: /^[\w.\/_-]+(?=\s*:)/gm,
    comment: /#.*$/gm,
    variable: /\$\([\w]+\)|\$\{[\w]+\}|\$\$@|\$\^|\$\<|\$\*/g,
    keyword: /\b(?:ifeq|ifneq|ifdef|ifndef|else|endif|define|endef|export|unexport|include|override|vpath)\b/g,
    function: /\b(?:patsubst|subst|strip|findstring|filter|filter-out|sort|word|words|wordlist|firstword|lastword|dir|notdir|suffix|basename|addsuffix|addprefix|join|wildcard|realpath|abspath|shell|error|warning|info|foreach|if|or|and|call|value|eval|origin|flavor)\s*\(/g,
  },
  graphql: {
    keyword: /\b(?:query|mutation|subscription|fragment|type|interface|union|enum|input|extend|schema|directive|scalar|implements|on)\b/g,
    string: /"(?:[^"\\]|\\.)*"/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g,
    comment: /#.*$/gm,
    variable: /\$\w+/g,
    boolean: /\b(?:true|false|null)\b/g,
    punctuation: /[{}()\[\];,:]/g,
  },
  markdown: {
    heading: /^#{1,6}\s.*$/gm,
    bold: /\*\*[^*]+\*\*|__[^_]+__/g,
    italic: /\*[^*]+\*|_[^_]+_/g,
    strikethrough:/~~[^~]+~~/g,
    code: /`[^`]+`/g,
    link: /\[[^\]]+\]\([^)]+\)/g,
    image: /!\[[^\]]*\]\([^)]+\)/g,
    list: /^[\s]*[-*+]\s/gm,
    quote: /^>\s/gm,
    url: /https?:\/\/[^\s<]+/g,
  },
  toml: {
    key: /^\s*[\w.-]+\s*(?==)/gm,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g,
    boolean: /\b(?:true|false)\b/g,
    comment: /#.*$/gm,
    date: /\b\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?\b/g,
    table: /^\[.*?\]$/gm,
  },
  ini: {
    section: /^\[.*?\]$/gm,
    key: /^\s*[\w.]+\s*(?==)/gm,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/gs,
    number: /\b\d+\.?\d*\b/g,
    boolean: /\b(?:true|false|yes|no|on|off|1|0)\b/g,
    comment: /[;#].*$/gm,
  },
  diff: {
    plus: /^\+.*$/gm,
    minus: /^-.*$/gm,
    at: /^@@.*$/gm,
    header: /^diff.*$|^---.*$|^\+\+\+.*$/gm,
  },
  perl: {
    keyword: /\b(?:my|our|local|sub|if|elsif|else|unless|while|until|for|foreach|do|given|when|default|return|last|next|redo|goto|die|warn|print|say|open|close|use|require|package|module|true|false|undef|defined|shift|pop|push|split|join|map|grep|sort|keys|values|each|scalar|wantarray|caller|bless|tie|untie|ref|tied|prototype|format|select|eval|BEGIN|CHECK|INIT|END)\b/g,
    comment: /#.*$/gm,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g,
    function: /\b([a-zA-Z_]\w*)\s*\(/g,
    variable: /\$[\w:]+|@[\w:]+|%[\w:]+/g,
    operator: /[+\-*/%=<>!&|^~?:]+|->|=>/g,
    punctuation: /[{}()\[\];,:.]/g,
  },
  scala: {
    keyword: /\b(?:def|val|var|lazy|class|object|trait|case|enum|extends|with|implements|abstract|final|sealed|implicit|override|private|protected|public|package|import|if|else|for|while|do|yield|return|match|throw|try|catch|finally|true|false|null|this|super|new|type|macro|inline|transparent|open|infix|extension|given|using|as|in|match)\b/g,
    comment: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    string: /"(?:[^"\\]|\\.)*"|""".*?"""/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?[fFL]?\b/g,
    function: /\b([a-zA-Z_]\w*)\s*\(/g,
    annotation: /@\w+/g,
    operator: /[+\-*/%=<>!&|^~?:]+|::|=>|<-/g,
    punctuation: /[{}()\[\];,:.]/g,
  },
  elixir: {
    keyword: /\b(?:def|defmodule|defstruct|defprotocol|defimpl|defguard|defmacro|defdelegate|defexception|defoverridable|if|else|unless|for|while|case|cond|receive|send|spawn|try|rescue|catch|after|else|raise|throw|exit|true|false|nil|fn|end|do|with|when|in|not|and|or|import|alias|use|require|quote|unquote|super|__MODULE__|__MODULE__|__ENV__)\b/g,
    comment: /#.*$/gm,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|~[rRwW]\([^)]*\)|~[rRwW]\[[^\]]*\]|~[rRwW]\{[^}]*\}|~[rRwW]\|[^|]*\|/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g,
    function: /\b([a-zA-Z_]\w*)\s*\(/g,
    module: /\b[A-Z]\w*\b/g,
    operator: /[+\-*/%=<>!&|^~?:]+|->|::/g,
    punctuation: /[{}()\[\];,:.]/g,
  },
  r: {
    keyword: /\b(?:if|else|for|while|repeat|function|return|next|break|TRUE|FALSE|NULL|NA|NaN|Inf|in|library|require|source|setwd|getwd|install|packages|data|rm|ls|str|summary|head|tail|plot|print|c|list|data|frame|matrix|factor|apply|lapply|sapply|tapply|mapply|replicate|aggregate|merge|subset|transform|split|unlist|seq|rep|length|names|rownames|colnames|dim|nrow|ncol|class|typeof|mode|as\.\w+|is\.\w+)\b/g,
    comment: /#.*$/gm,
    string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/gs,
    number: /\b\d+\.?\d*(?:e[+-]?\d+)?\b/g,
    function: /\b([a-zA-Z_.]\w*)\s*\(/g,
    operator: /[+\-*/%=<>!&|^~?:]+|%>%|%in%|\/%/g,
    punctuation: /[{}()\[\];,:.]/g,
  },
}

function tokenize(code, lang) {
  const rules = KEYWORDS[lang] || KEYWORDS._default
  if (!rules && !lang) return code

  const tokens = []
  let lastIndex = 0
  let match

  const allPatterns = []
  for (const [type, pattern] of Object.entries(rules)) {
    pattern.lastIndex = 0
    allPatterns.push({ type, pattern })
  }

  const combined = new RegExp(
    allPatterns.map(p => `(${p.pattern.source})`).join('|'),
    allPatterns.some(p => p.pattern.flags.includes('g'))
      ? 'g' + (allPatterns.some(p => p.pattern.flags.includes('s')) ? 's' : '') + (allPatterns.some(p => p.pattern.flags.includes('m')) ? 'm' : '')
      : 'g'
  )

  const types = allPatterns.map(p => p.type)

  while ((match = combined.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: code.slice(lastIndex, match.index), type: null })
    }
    const tokenIndex = match.slice(1).findIndex(v => v !== undefined)
    tokens.push({ text: match[0], type: types[tokenIndex] || null })
    lastIndex = combined.lastIndex
  }

  if (lastIndex < code.length) {
    tokens.push({ text: code.slice(lastIndex), type: null })
  }

  return tokens.length > 0 ? tokens : code
}

function CodeBlock({ className, children }) {
  const [copied, setCopied] = useState(false)
  const match = /language-(\w+)/.exec(className || '')
  const code = String(children).replace(/\n$/, '')
  const lang = match ? match[1] : ''

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  const tokens = lang ? tokenize(code, lang) : code

  return (
    <div className="code-block-wrapper">
      {lang && (
        <div className="code-block-header">
          <span className="code-block-lang">{lang}</span>
          <button className="code-block-copy" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre className={`code-block-body${!lang ? ' code-block-nolang' : ''}`}>
        <code>
          {Array.isArray(tokens)
            ? tokens.map((t, i) =>
                t.type ? (
                  <span key={i} className={`token ${t.type}`}>{t.text}</span>
                ) : (
                  <span key={i}>{t.text}</span>
                )
              )
            : code}
        </code>
      </pre>
    </div>
  )
}

export default function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }) {
            const isInline =
              !className &&
              node?.children?.length === 1 &&
              node?.children[0]?.type === 'text'
            if (isInline) {
              return <code className="inline-code" {...props}>{children}</code>
            }
            return <CodeBlock className={className} {...props}>{children}</CodeBlock>
          },
          h1({ children }) { return <h1 className="md-h1">{children}</h1> },
          h2({ children }) { return <h2 className="md-h2">{children}</h2> },
          h3({ children }) { return <h3 className="md-h3">{children}</h3> },
          strong({ children }) { return <strong className="md-strong">{children}</strong> },
          em({ children }) { return <em className="md-em">{children}</em> },
          ul({ children }) { return <ul className="md-ul">{children}</ul> },
          ol({ children }) { return <ol className="md-ol">{children}</ol> },
          li({ children }) { return <li className="md-li">{children}</li> },
          a({ children, href }) { return <a className="md-a" href={href} target="_blank" rel="noopener noreferrer">{children}</a> },
          blockquote({ children }) { return <blockquote className="md-blockquote">{children}</blockquote> },
          hr() { return <hr className="md-hr" /> },
          table({ children }) { return <table className="md-table">{children}</table> },
          th({ children }) { return <th className="md-th">{children}</th> },
          td({ children }) { return <td className="md-td">{children}</td> },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
